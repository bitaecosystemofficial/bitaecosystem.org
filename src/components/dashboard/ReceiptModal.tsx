import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ExternalLink, MessageCircle } from "lucide-react";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import type { Item } from "@/types/Item";

interface ReceiptModalProps {
  item: Item;
  txHash: string;
  open: boolean;
  onClose: () => void;
}

export const ReceiptModal = ({ item, txHash, open, onClose }: ReceiptModalProps) => {
  const { address } = useAccount();

  const sendWhatsAppReceipt = () => {
    // Merchant phone number (this should come from item.merchant metadata)
    const merchantPhone = "+1234567890"; // Replace with actual merchant phone
    
    const message = `✅ New Item Exchange
    
Item: ${item.name}
Buyer: ${address}
Amount: ${formatUnits(item.price, 9)} BIT
Tx Hash: ${txHash}

View on BSCScan: https://bscscan.com/tx/${txHash}`;

    window.open(
      `https://api.whatsapp.com/send?phone=${merchantPhone}&text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const viewOnExplorer = () => {
    window.open(`https://bscscan.com/tx/${txHash}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            Exchange Successful!
          </DialogTitle>
        </DialogHeader>

        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">You exchanged</p>
                <p className="text-3xl font-bold text-primary">
                  {formatUnits(item.price, 9)} BIT
                </p>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Item:</span>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Merchant:</span>
                  <span className="font-mono text-xs">
                    {item.merchant.slice(0, 6)}...{item.merchant.slice(-4)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your Address:</span>
                  <span className="font-mono text-xs">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Transaction:</span>
                  <span className="font-mono text-xs">
                    {txHash.slice(0, 6)}...{txHash.slice(-4)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={viewOnExplorer}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View on BSCScan
          </Button>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={sendWhatsAppReceipt}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Send WhatsApp Receipt to Merchant
          </Button>

          <Button
            className="w-full"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
