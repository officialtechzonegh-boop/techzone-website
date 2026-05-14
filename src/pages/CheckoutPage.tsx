import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emailService } from "@/lib/emailService";

type CheckoutFormValues = {
  name: string;
  gender: "male" | "female";
  location: string;
  address: string;
  contact: string;
  email: string;
  paymentMethod: "mobile_money" | "card" | "cash_on_delivery";
};

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to proceed with checkout");
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const form = useForm<CheckoutFormValues>({
    defaultValues: {
      name: "",
      gender: "male",
      location: "",
      address: "",
      contact: "",
      email: "",
      paymentMethod: "mobile_money",
    },
    mode: "onTouched",
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  const onSubmit = async (values: CheckoutFormValues) => {
    try {
      const orderData = {
        ...values,
        items: cartItems,
        subtotal,
        total,
        createdAt: serverTimestamp(),
        status: "pending",
      };

      const orderRef = await addDoc(collection(db, "orders"), orderData);
      const orderId = orderRef.id;
      
      // Send purchase confirmation email to customer
      const customerEmailSent = await emailService.sendPurchaseConfirmation(
        values.name,
        values.email,
        {
          items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          subtotal,
          total,
          orderId
        }
      );
      
      if (!customerEmailSent) {
        console.warn("Failed to send customer confirmation email");
      }
      
      // Send notification email to admin
      const adminEmailSent = await emailService.sendAdminNotification(
        {
          name: values.name,
          email: values.email,
          contact: values.contact,
          location: values.location,
          address: values.address,
          paymentMethod: values.paymentMethod
        },
        {
          items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          subtotal,
          total,
          orderId
        }
      );
      
      if (!adminEmailSent) {
        console.warn("Failed to send admin notification email");
      }
      
      clearCart();
      toast.success("Order placed successfully! Check your email for confirmation.");
      setShowForm(false);
      form.reset(values);
    } catch (error) {
      console.error("Error placing order: ", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header />
      <main className="container py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Checkout</h1>

        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Customer Details</DialogTitle>
              <DialogDescription>
                Enter your details to place this order.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact"
                    rules={{ required: "Contact is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" inputMode="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email address" type="email" inputMode="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    rules={{ required: "Location is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City / Town" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  rules={{ required: "Address is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="House number, street, landmarks" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    rules={{ required: "Gender is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            className="flex items-center gap-6"
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="male" id="gender-male" />
                              <Label htmlFor="gender-male">Male</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="female" id="gender-female" />
                              <Label htmlFor="gender-female">Female</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    rules={{ required: "Payment method is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mobile_money">Mobile Money</SelectItem>
                              <SelectItem value="card">Card</SelectItem>
                              <SelectItem value="cash_on_delivery">Cash on Delivery</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter className="gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Confirm Order</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl mb-4">Your cart is empty.</p>
            <Button asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded-md"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.quantity} x GH₵{item.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="font-semibold">GH₵{(item.quantity * item.price).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="p-6 border rounded-lg sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>GH₵{subtotal.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>GH₵{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full mt-6 h-12 text-base" onClick={() => setShowForm(true)}>
                  Place Order
                </Button>
                <Button asChild variant="outline" className="w-full mt-3 h-12 text-base">
                  <Link to="/cart">Back to Cart</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
