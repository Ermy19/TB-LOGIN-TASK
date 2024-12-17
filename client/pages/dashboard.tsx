import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockTransactions = [
  { id: 1, date: "2024-01-15", type: "Deposit", amount: "$1,200.00", status: "completed" },
  { id: 2, date: "2024-01-14", type: "Withdrawal", amount: "$350.00", status: "pending" },
  { id: 3, date: "2024-01-13", type: "Deposit", amount: "$2,000.00", status: "completed" },
  { id: 4, date: "2024-01-12", type: "Withdrawal", amount: "$500.00", status: "completed" },
];

function Dashboard() {
  const { user } = useUser();
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
          </div>
          <Button variant="destructive" asChild>
            <a href="/api/auth/logout">Logout</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Total Balance</h3>
            <p className="text-2xl font-bold">$12,450.90</p>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Monthly Spending</h3>
            <p className="text-2xl font-bold">$2,345.00</p>
            <p className="text-xs text-muted-foreground">-12% from last month</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Active Cards</h3>
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-muted-foreground">2 pending applications</p>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === "completed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {transaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

export default withPageAuthRequired(Dashboard);