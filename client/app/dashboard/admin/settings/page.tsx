"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { User, Lock, Bell, Moon, Sun, LogOut, Save, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function AdminSettings() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  // Profile settings
  const [profile, setProfile] = useState({
    name: "Dr. Smith",
    email: "dr.smith@example.com",
    phone: "+1 (555) 123-4567",
    subject: "Mathematics",
    bio: "Mathematics professor with 10+ years of teaching experience in calculus and algebra.",
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    classReminders: true,
    testSubmissions: true,
    studentMessages: true,
    adminAnnouncements: true,
  })

  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: "dark",
    fontSize: "medium",
    highContrast: false,
  })

  // Security settings
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
  })

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAppearanceChange = (name: string, value: string | boolean) => {
    setAppearance((prev) => ({ ...prev, [name]: value }))
  }

  const handleSecurityChange = (name: string, value: string | boolean) => {
    setSecurity((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true)
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSaving(true)
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Password changed",
        description: "Your password has been updated successfully",
      })

      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    // In a real app, this would clear the session/token
    router.push("/")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveSettings} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="profile" className="data-[state=active]:bg-slate-700">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-700">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-slate-700">
            <Sun className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-slate-700">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
              <CardDescription className="text-slate-400">Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-300">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-slate-300">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={profile.subject}
                    onChange={handleProfileChange}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-slate-300">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Account Management</CardTitle>
              <CardDescription className="text-slate-400">Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Delete Account</h3>
                  <p className="text-slate-400 text-sm">Permanently delete your account and all associated data</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-slate-900 border-slate-800 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Account</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-400">
                        Are you sure you want to delete your account? This action cannot be undone and all your data
                        will be permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-white border-slate-700">Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete Account</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <Separator className="bg-slate-800" />
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Log Out</h3>
                  <p className="text-slate-400 text-sm">Log out of your account on this device</p>
                </div>
                <Button variant="outline" className="text-white border-slate-700" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
              <CardDescription className="text-slate-400">Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Email Notifications</Label>
                  <p className="text-sm text-slate-400">Receive notifications via email</p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                />
              </div>
              <Separator className="bg-slate-800" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Class Reminders</Label>
                  <p className="text-sm text-slate-400">Receive reminders about upcoming classes</p>
                </div>
                <Switch
                  checked={notifications.classReminders}
                  onCheckedChange={(checked) => handleNotificationChange("classReminders", checked)}
                />
              </div>
              <Separator className="bg-slate-800" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Test Submissions</Label>
                  <p className="text-sm text-slate-400">Get notified when students submit tests</p>
                </div>
                <Switch
                  checked={notifications.testSubmissions}
                  onCheckedChange={(checked) => handleNotificationChange("testSubmissions", checked)}
                />
              </div>
              <Separator className="bg-slate-800" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Student Messages</Label>
                  <p className="text-sm text-slate-400">Receive notifications for new student messages</p>
                </div>
                <Switch
                  checked={notifications.studentMessages}
                  onCheckedChange={(checked) => handleNotificationChange("studentMessages", checked)}
                />
              </div>
              <Separator className="bg-slate-800" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Admin Announcements</Label>
                  <p className="text-sm text-slate-400">Receive important announcements from administrators</p>
                </div>
                <Switch
                  checked={notifications.adminAnnouncements}
                  onCheckedChange={(checked) => handleNotificationChange("adminAnnouncements", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Appearance Settings</CardTitle>
              <CardDescription className="text-slate-400">Customize how the application looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-white">Theme</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={appearance.theme === "light" ? "default" : "outline"}
                    className={
                      appearance.theme === "light" ? "bg-blue-600 hover:bg-blue-700" : "text-white border-slate-700"
                    }
                    onClick={() => handleAppearanceChange("theme", "light")}
                  >
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </Button>
                  <Button
                    variant={appearance.theme === "dark" ? "default" : "outline"}
                    className={
                      appearance.theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "text-white border-slate-700"
                    }
                    onClick={() => handleAppearanceChange("theme", "dark")}
                  >
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </Button>
                </div>
              </div>
              <Separator className="bg-slate-800" />
              <div className="space-y-4">
                <Label className="text-white">Font Size</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={appearance.fontSize === "small" ? "default" : "outline"}
                    className={
                      appearance.fontSize === "small" ? "bg-blue-600 hover:bg-blue-700" : "text-white border-slate-700"
                    }
                    onClick={() => handleAppearanceChange("fontSize", "small")}
                  >
                    Small
                  </Button>
                  <Button
                    variant={appearance.fontSize === "medium" ? "default" : "outline"}
                    className={
                      appearance.fontSize === "medium" ? "bg-blue-600 hover:bg-blue-700" : "text-white border-slate-700"
                    }
                    onClick={() => handleAppearanceChange("fontSize", "medium")}
                  >
                    Medium
                  </Button>
                  <Button
                    variant={appearance.fontSize === "large" ? "default" : "outline"}
                    className={
                      appearance.fontSize === "large" ? "bg-blue-600 hover:bg-blue-700" : "text-white border-slate-700"
                    }
                    onClick={() => handleAppearanceChange("fontSize", "large")}
                  >
                    Large
                  </Button>
                </div>
              </div>
              <Separator className="bg-slate-800" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">High Contrast</Label>
                  <p className="text-sm text-slate-400">Increase contrast for better visibility</p>
                </div>
                <Switch
                  checked={appearance.highContrast}
                  onCheckedChange={(checked) => handleAppearanceChange("highContrast", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Change Password</CardTitle>
              <CardDescription className="text-slate-400">
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-slate-300">
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-slate-300">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-slate-300">
                  Confirm New Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleChangePassword}
                disabled={isSaving}
              >
                {isSaving ? "Changing Password..." : "Change Password"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
              <CardDescription className="text-slate-400">Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Two-Factor Authentication</Label>
                  <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  checked={security.twoFactorAuth}
                  onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                />
              </div>
              <Separator className="bg-slate-800" />
              <div className="space-y-2">
                <Label htmlFor="session-timeout" className="text-white">
                  Session Timeout (minutes)
                </Label>
                <p className="text-sm text-slate-400 mb-2">Automatically log out after a period of inactivity</p>
                <Input
                  id="session-timeout"
                  type="number"
                  value={security.sessionTimeout}
                  onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white w-full md:w-1/4"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

