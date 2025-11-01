import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Store, CheckCircle2, Loader2 } from "lucide-react";
import { formatUnits } from "viem";
import { useTokenApproval } from "@/hooks/useTokenApproval";
import { useExchange } from "@/hooks/useExchange";
import { toast } from "@/hooks/use-toast";
import type { Item } from "@/types/Item";
import { ReceiptModal } from "./ReceiptModal";

interface ItemDetailsModalProps {
  item: Item;
  open: boolean;
  onClose: () => void;
}

export const ItemDetailsModal = ({ item, open, onClose }: ItemDetailsModalProps) => {
  const [step, setStep] = useState<"approve" | "exchange" | "receipt">("approve");
  const [txHash, setTxHash] = useState<string | null>(null);
  const { approveTokens, isApproving } = useTokenApproval();
  const { exchangeItem, isExchanging } = useExchange();

  const handleApprove = async () => {
    const success = await approveTokens(item.price);
    if (success) {
      setStep("exchange");
      toast({
        title: "Approval successful",
        description: "You can now exchange the item",
      });
    }
  };

  const handleExchange = async () => {
    const hash = await exchangeItem(item.id);
    if (hash) {
      setTxHash(hash);
      setStep("receipt");
      toast({
        title: "Exchange successful!",
        description: "Your item has been exchanged",
      });
    }
  };

  const handleClose = () => {
    setStep("approve");
    setTxHash(null);
    onClose();
  };

  if (step === "receipt" && txHash) {
    return (
      <ReceiptModal
        item={item}
        txHash={txHash}
        open={open}
        onClose={handleClose}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{item.name}</DialogTitle>
          <DialogDescription>Item Details</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <Package className="h-24 w-24 text-muted-foreground" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-sm">
                {item.category}
              </Badge>
              <Badge variant={item.stock > 0 ? "default" : "destructive"}>
                {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Store className="h-4 w-4" />
              <span>Merchant: {item.merchant.slice(0, 6)}...{item.merchant.slice(-4)}</span>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Price</span>
                <span className="text-3xl font-bold text-primary">
                  {formatUnits(item.price, 9)} BIT
                </span>
              </div>

              {step === "approve" && (
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleApprove}
                  disabled={isApproving || item.stock === 0}
                >
                  {isApproving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Approving...
                    </>
                  ) : (
                    "Approve BIT Tokens"
                  )}
                </Button>
              )}

              {step === "exchange" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Tokens approved</span>
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleExchange}
                    disabled={isExchanging}
                  >
                    {isExchanging ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Exchange...
                      </>
                    ) : (
                      "Exchange Now"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
