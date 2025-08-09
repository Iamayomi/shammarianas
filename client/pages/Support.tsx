import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  MessageSquare, 
  Plus, 
  Filter, 
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  Calendar,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Layout from "@/components/Layout";
import { toast } from "sonner";

interface SupportTicket {
  _id: string;
  subject: string;
  message: string;
  category: string;
  priority: string;
  status: string;
  adminResponse?: string;
  createdAt: string;
  updatedAt: string;
}

const categoryLabels = {
  'technical': 'Technical Issue',
  'billing': 'Billing & Payments',
  'general': 'General Inquiry',
  'bug-report': 'Bug Report',
  'feature-request': 'Feature Request'
};

const statusColors = {
  'open': 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  'resolved': 'bg-green-100 text-green-800',
  'closed': 'bg-gray-100 text-gray-800'
};

const statusIcons = {
  'open': Clock,
  'in-progress': AlertCircle,
  'resolved': CheckCircle,
  'closed': XCircle
};

export default function Support() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Create ticket form state
  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
    category: '',
    priority: 'medium'
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchTickets();
  }, [user, token, statusFilter]);

  const fetchTickets = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const url = statusFilter === 'all' 
        ? '/api/support/tickets'
        : `/api/support/tickets?status=${statusFilter}`;

      const response = await fetch(url, { headers });
      
      if (response.ok) {
        const data = await response.json();
        setTickets(data.tickets || []);
      } else {
        toast.error('Failed to load support tickets');
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load support tickets');
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async () => {
    if (!newTicket.subject.trim() || !newTicket.message.trim() || !newTicket.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch('/api/support/tickets', {
        method: 'POST',
        headers,
        body: JSON.stringify(newTicket)
      });

      if (response.ok) {
        toast.success('Support ticket created successfully!');
        setIsCreateDialogOpen(false);
        setNewTicket({ subject: '', message: '', category: '', priority: 'medium' });
        fetchTickets();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to create ticket');
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error('Failed to create ticket');
    }
  };

  const closeTicket = async (ticketId: string) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`/api/support/tickets/${ticketId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status: 'closed' })
      });

      if (response.ok) {
        toast.success('Ticket closed successfully');
        fetchTickets();
        if (selectedTicket && selectedTicket._id === ticketId) {
          setSelectedTicket({ ...selectedTicket, status: 'closed' });
        }
      } else {
        toast.error('Failed to close ticket');
      }
    } catch (error) {
      console.error('Error closing ticket:', error);
      toast.error('Failed to close ticket');
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <User className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h2 className="text-xl font-semibold mb-2">Login Required</h2>
              <p className="text-gray-600 mb-6">
                You need to be logged in to access the support center.
              </p>
              <div className="space-y-2">
                <Button onClick={() => navigate("/login")} className="w-full">
                  Sign In
                </Button>
                <Button onClick={() => navigate("/register")} variant="outline" className="w-full">
                  Create Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading support tickets...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Support Center</h1>
            <p className="text-gray-400 mt-1">
              Get help with your account and purchases
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Support Ticket</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={newTicket.category} onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newTicket.priority} onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue in detail..."
                    rows={6}
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createTicket}>
                    Create Ticket
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tickets List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tickets</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tickets */}
            <div className="space-y-4">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => {
                  const StatusIcon = statusIcons[ticket.status as keyof typeof statusIcons];
                  return (
                    <Card 
                      key={ticket._id} 
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-l-4 ${
                        selectedTicket?._id === ticket._id ? 'border-l-purple-600 bg-purple-50/5' : 'border-l-gray-600'
                      }`}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-white mb-1">{ticket.subject}</h3>
                            <p className="text-sm text-gray-400 line-clamp-2">{ticket.message}</p>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Badge className={statusColors[ticket.status as keyof typeof statusColors]}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {ticket.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Tag className="h-3 w-3 mr-1" />
                              {categoryLabels[ticket.category as keyof typeof categoryLabels]}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <Badge variant={ticket.priority === 'urgent' ? 'destructive' : 'secondary'} className="text-xs">
                            {ticket.priority}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-white mb-2">No tickets found</h3>
                    <p className="text-gray-400 mb-4">
                      {searchQuery ? 'No tickets match your search.' : 'You haven\'t created any support tickets yet.'}
                    </p>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                      Create Your First Ticket
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Ticket Details */}
          <div className="space-y-6">
            {selectedTicket ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{selectedTicket.subject}</CardTitle>
                      <p className="text-sm text-gray-400 mt-1">
                        Created {new Date(selectedTicket.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={statusColors[selectedTicket.status as keyof typeof statusColors]}>
                      {selectedTicket.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Description</h4>
                    <p className="text-gray-300 whitespace-pre-wrap">{selectedTicket.message}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Category:</span>
                      <p className="text-white">{categoryLabels[selectedTicket.category as keyof typeof categoryLabels]}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Priority:</span>
                      <p className="text-white capitalize">{selectedTicket.priority}</p>
                    </div>
                  </div>

                  {selectedTicket.adminResponse && (
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="font-semibold text-white mb-2">Admin Response</h4>
                      <div className="bg-blue-50/5 p-3 rounded-lg">
                        <p className="text-gray-300 whitespace-pre-wrap">{selectedTicket.adminResponse}</p>
                      </div>
                    </div>
                  )}

                  {selectedTicket.status !== 'closed' && (
                    <div className="border-t border-gray-700 pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => closeTicket(selectedTicket._id)}
                        className="w-full"
                      >
                        Close Ticket
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold text-white mb-2">Select a Ticket</h3>
                  <p className="text-gray-400">
                    Choose a ticket from the list to view details
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-white">Common Issues</h4>
                  <ul className="text-sm text-gray-400 space-y-1 mt-1">
                    <li>• Download problems</li>
                    <li>• Payment issues</li>
                    <li>• Account access</li>
                    <li>• Asset licensing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white">Response Time</h4>
                  <p className="text-sm text-gray-400">
                    We typically respond within 24 hours on business days.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
