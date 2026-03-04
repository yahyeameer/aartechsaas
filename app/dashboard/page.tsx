"use client"

import { useUser } from "@clerk/nextjs"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Trash2, Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
    const { user, isLoaded } = useUser()
    const projects = useQuery(api.projects.get)
    const contacts = useQuery(api.contacts.get)
    const createProject = useMutation(api.projects.create)
    const deleteProject = useMutation(api.projects.remove)

    const [newProject, setNewProject] = useState({
        title: "",
        category: "Management Systems",
        description: "",
        image: "",
        demoUrl: "",
        walkthroughUrl: ""
    })

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault()
        await createProject(newProject)
        setNewProject({
            title: "",
            category: "Management Systems",
            description: "",
            image: "",
            demoUrl: "",
            walkthroughUrl: ""
        })
    }

    if (!isLoaded) return <div className="flex h-screen items-center justify-center bg-black text-white"><Loader2 className="animate-spin" /></div>

    if (!user) {
        return <div className="flex h-screen items-center justify-center bg-black text-white">Access Denied. Please Sign In.</div>
    }

    const isAdmin = user.publicMetadata?.role === "admin";

    if (!isAdmin) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-black text-white space-y-4">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="text-neutral-400">You do not have permission to view this page.</p>
                <Button asChild variant="outline">
                    <Link href="/">Return to Home</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-[90vh] bg-black text-white p-8 pt-32">
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Admin Dashboard</h1>
                    <p className="text-neutral-400">Welcome, {user.fullName}</p>
                </div>

                <Tabs defaultValue="projects" className="w-full">
                    <TabsList className="bg-neutral-900 border border-white/10 mb-8">
                        <TabsTrigger value="projects">Manage Projects</TabsTrigger>
                        <TabsTrigger value="bookings">View Bookings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="projects" className="space-y-8">
                        {/* Add Project Form */}
                        <Card className="bg-neutral-900/50 border-white/10 text-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Plus className="w-5 h-5 text-purple-400" /> Add New Project</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleCreateProject} className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Project Title"
                                        value={newProject.title}
                                        onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                                        className="bg-black/40 border-white/10 text-white"
                                        required
                                    />
                                    <Input
                                        placeholder="Category (e.g. AI Agents, Mobile Apps)"
                                        value={newProject.category}
                                        onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                                        className="bg-black/40 border-white/10 text-white"
                                        required
                                    />
                                    <Input
                                        placeholder="Image URL"
                                        value={newProject.image}
                                        onChange={e => setNewProject({ ...newProject, image: e.target.value })}
                                        className="bg-black/40 border-white/10 text-white"
                                        required
                                    />
                                    <Input
                                        placeholder="Demo URL"
                                        value={newProject.demoUrl}
                                        onChange={e => setNewProject({ ...newProject, demoUrl: e.target.value })}
                                        className="bg-black/40 border-white/10 text-white"
                                    />
                                    <Textarea
                                        placeholder="Description"
                                        value={newProject.description}
                                        onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                                        className="bg-black/40 border-white/10 text-white md:col-span-2"
                                        required
                                    />
                                    <Button type="submit" className="md:col-span-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90">Create Project</Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Projects List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects === undefined ? (
                                <Loader2 className="animate-spin" />
                            ) : projects.length === 0 ? (
                                <p className="text-neutral-500">No projects found.</p>
                            ) : (
                                projects.map(project => (
                                    <Card key={project._id} className="bg-neutral-900/50 border-white/10 text-white overflow-hidden group">
                                        <div className="h-40 overflow-hidden relative">
                                            <Image src={project.image} alt={project.title} width={400} height={160} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" unoptimized />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                                <p className="text-xs text-center">{project.description}</p>
                                            </div>
                                        </div>
                                        <CardContent className="p-4 flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-lg">{project.title}</h3>
                                                <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded-full">{project.category}</span>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => deleteProject({ id: project._id })}
                                                className="h-8 w-8"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="bookings">
                        <Card className="bg-neutral-900/50 border-white/10 text-white">
                            <CardHeader>
                                <CardTitle>Recent Bookings</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {contacts === undefined ? (
                                    <Loader2 className="animate-spin" />
                                ) : contacts.length === 0 ? (
                                    <p className="text-neutral-500">No booking requests yet.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {contacts.map(contact => (
                                            <div key={contact._id} className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row justify-between gap-4">
                                                <div>
                                                    <h4 className="font-bold text-lg text-purple-300">{contact.name}</h4>
                                                    <p className="text-sm text-neutral-400">{contact.email}</p>
                                                    <p className="text-xs text-neutral-500 mt-1">{new Date(contact.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex-1 bg-white/5 p-3 rounded-lg text-sm text-neutral-300">
                                                    {contact.message}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
