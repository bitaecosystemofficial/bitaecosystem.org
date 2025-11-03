import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Shield, Plus, Loader2, Upload, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { parseUnits } from 'viem';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/config/contracts';
import { toast } from '@/hooks/use-toast';
import type { Item } from '@/types/Item';
import { supabase } from '@/integrations/supabase/client';

interface ItemAdminPanelProps {
  existingItems: Item[];
}

export function ItemAdminPanel({ existingItems }: ItemAdminPanelProps) {
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });
  const { address } = useAccount();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    merchant: address || '',
    stock: '',
    category: 'Electronics',
    imageUrl: '',
    merchantWhatsApp: '',
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Gaming', 'Other'];

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile || !address) return '';

    setUploadingImage(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${address}/${Date.now()}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('exchange-shop-items')
        .upload(fileName, imageFile);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('exchange-shop-items')
        .getPublicUrl(fileName);

      toast({
        title: "Image uploaded",
        description: "Product image uploaded successfully",
      });

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image",
        variant: "destructive",
      });
      return '';
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData({ ...formData, imageUrl: '' });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.stock || !formData.merchantWhatsApp) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields including WhatsApp number",
        variant: "destructive",
      });
      return;
    }

    try {
      // Upload image first if selected
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        imageUrl = await handleImageUpload();
        if (!imageUrl) return; // Upload failed
      }

      const priceInSmallestUnit = parseUnits(formData.price, 9); // BIT has 9 decimals

      await writeContract({
        address: CONTRACT_ADDRESSES.EXCHANGE_SHOP,
        abi: CONTRACT_ABIS.EXCHANGE_SHOP,
        functionName: "listItem",
        args: [
          formData.name,
          formData.description,
          priceInSmallestUnit,
          BigInt(formData.stock),
          formData.category,
          imageUrl,
          formData.merchantWhatsApp,
        ],
      } as any);

      toast({
        title: "Item Listed",
        description: `${formData.name} is being added to the blockchain`,
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        merchant: address || '',
        stock: '',
        category: 'Electronics',
        imageUrl: '',
        merchantWhatsApp: '',
      });
      setImageFile(null);
      setImagePreview('');
    } catch (error: any) {
      console.error("Error listing item:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to list item",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Add New Item to Blockchain</CardTitle>
          </div>
          <CardDescription>
            List items on the Exchange Shop smart contract. Items will be stored on the blockchain.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Premium Headphones"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (BIT tokens) *</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g., 500"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input
                id="stock"
                type="number"
                placeholder="e.g., 25"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Item description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="image">Product Image</Label>
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-primary hover:underline">Click to upload</span>
                      <span className="text-muted-foreground"> or drag and drop</span>
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="imageUrl" className="text-sm text-muted-foreground">
                    Or paste image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="merchantWhatsApp">Merchant WhatsApp Number *</Label>
              <Input
                id="merchantWhatsApp"
                placeholder="+1234567890"
                value={formData.merchantWhatsApp}
                onChange={(e) => setFormData({ ...formData, merchantWhatsApp: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">
                Order details will be sent to this WhatsApp number
              </p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="merchant">Merchant Address (Wallet receiving payments)</Label>
              <Input
                id="merchant"
                placeholder="0x..."
                value={formData.merchant}
                onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                disabled
              />
              <p className="text-sm text-muted-foreground">
                Your connected wallet address will receive BIT tokens from sales
              </p>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full" disabled={isConfirming || uploadingImage}>
            {uploadingImage ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading Image...
              </>
            ) : isConfirming ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Listing on Blockchain...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Item to Blockchain
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {existingItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Items on Blockchain ({existingItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {existingItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(Number(item.price) / 1e9).toLocaleString()} BIT · Stock: {item.stock} · {item.category}
                    </p>
                  </div>
                  <Badge variant={item.active ? "default" : "secondary"}>
                    {item.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
