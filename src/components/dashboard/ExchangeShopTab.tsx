import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Search, Package, Settings, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatUnits } from "viem";
import { useReadContract, useAccount } from "wagmi";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "@/config/contracts";
import { ItemDetailsModal } from "./ItemDetailsModal";
import { ItemAdminPanel } from "./ItemAdminPanel";
import type { Item } from "@/types/Item";
import { useIsContractOwner } from "@/hooks/useIsContractOwner";

export const ExchangeShopTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { isOwner } = useIsContractOwner();
  const { address } = useAccount();
  const isMobile = useIsMobile();

  // Get total items from smart contract
  const { data: totalItems, isLoading: loadingTotal, refetch: refetchTotal } = useReadContract({
    address: CONTRACT_ADDRESSES.EXCHANGE_SHOP,
    abi: CONTRACT_ABIS.EXCHANGE_SHOP,
    functionName: "getTotalItems",
  });

  // Load all items from smart contract
  useEffect(() => {
    const loadItemsFromContract = async () => {
      if (!totalItems) {
        setLoadingItems(false);
        setItems([]);
        return;
      }

      setLoadingItems(true);
      const itemsArray: Item[] = [];
      const total = Number(totalItems);

      for (let i = 0; i < total; i++) {
        try {
          const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/read-contract`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              address: CONTRACT_ADDRESSES.EXCHANGE_SHOP,
              abi: CONTRACT_ABIS.EXCHANGE_SHOP,
              functionName: 'getItem',
              args: [BigInt(i)],
            }),
          });

          if (response.ok) {
            const itemData = await response.json();
            if (itemData && itemData.data) {
              const [id, name, description, price, merchant, stock, active, category, imageUrl, merchantWhatsApp] = itemData.data;
              itemsArray.push({
                id: Number(id),
                name,
                description,
                price,
                merchant,
                stock: Number(stock),
                active,
                category,
                imageUrl,
                merchantWhatsApp: merchantWhatsApp || "",
              });
            }
          }
        } catch (error) {
          console.error(`Error loading item ${i}:`, error);
        }
      }

      setItems(itemsArray);
      setLoadingItems(false);
    };

    loadItemsFromContract();
  }, [totalItems]);

  // Refetch items periodically when admin panel is shown
  useEffect(() => {
    if (showAdmin && isOwner) {
      const interval = setInterval(() => {
        refetchTotal();
      }, 5000); // Refetch every 5 seconds

      return () => clearInterval(interval);
    }
  }, [showAdmin, isOwner, refetchTotal]);

  const filteredItems = items.filter(
    (item) =>
      item.active &&
      item.stock > 0 &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination for mobile
  const itemsPerPage = isMobile ? 4 : filteredItems.length;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = isMobile ? filteredItems.slice(startIndex, endIndex) : filteredItems;

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Exchange Shop</h2>
          <p className="text-muted-foreground">
            Buy items using your BIT tokens
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isOwner && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowAdmin(!showAdmin)}
              title="Manage Items"
            >
              <Settings className="h-5 w-5" />
            </Button>
          )}
          <ShoppingBag className="h-8 w-8 text-primary" />
        </div>
      </div>

      {showAdmin && isOwner && (
        <ItemAdminPanel existingItems={items} />
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loadingItems || loadingTotal ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground text-center">
                Loading items from blockchain...
              </p>
            </CardContent>
          </Card>
        ) : filteredItems.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {searchQuery
                  ? "No items found matching your search"
                  : "No items available at the moment"}
              </p>
            </CardContent>
          </Card>
        ) : (
          paginatedItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="aspect-video bg-muted flex items-center justify-center">
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge variant="secondary">{item.category}</Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {formatUnits(item.price, 9)} BIT
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Stock: {item.stock}
                    </p>
                  </div>
                  <Button>Exchange Now</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Mobile Pagination */}
      {isMobile && filteredItems.length > itemsPerPage && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          open={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};
