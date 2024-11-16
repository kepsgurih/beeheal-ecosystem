"use client"

import React, { useState, useEffect } from 'react';
import { ITask, IUser, IUserSimpleEmail } from "@/types/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ListOfUsers } from '@/services/user';
import { saveData } from '@/services/tasks';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const NewTaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [currentStatus, setCurrentStatus] = useState(1);
    const [currentSprint, setCurrentSprint] = useState(1);
    const [currentPriority, setCurrentPriority] = useState(2);
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedAssignees, setSelectedAssignees] = useState<IUserSimpleEmail[]>([]);
    const [selectedOwner, setSelectedOwner] = useState<IUserSimpleEmail>();
    const [isSelectingAssignees, setIsSelectingAssignees] = useState(false);
    const [isSelectingOwner, setIsSelectingOwner] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await ListOfUsers();
            setUsers(data.data);
            console.log(data.data)
        } catch (error) {
            console.log(error)
            toast.error('Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    };

    const editor = useEditor({
        extensions: [StarterKit],
        content: description,
        onUpdate: () => setDescription(editor?.getHTML() as string),

    })

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }


    const createTask = async () => {
        try {
            const newTask: Partial<ITask> = {
                title,
                description,
                position: currentStatus,
                priority: currentPriority,
                assigned: selectedAssignees,
                sprint: currentSprint,
                owner: selectedOwner,
            };
            const response = await saveData(newTask)
            toast.success('Task created successfully');
            router.push('/dashboard/board/view/' + response.data.id);
        } catch (error) {
            console.log(error)
            toast.error('Failed to create task');
        }
    };

    const handleAssigneeChange = (user: IUserSimpleEmail) => {
        const isSelected = selectedAssignees.some(a => a.userid === user.userid);
        const newAssignees = isSelected
            ? selectedAssignees.filter(a => a.userid !== user.userid)
            : [...selectedAssignees, user];
        setSelectedAssignees(newAssignees);
    };

    const handleOwnerChange = (user: IUser) => {
        setSelectedOwner({
            userid: user.id,
            avatar: user.imageUrl,
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0].emailAddress
        });
        setIsSelectingOwner(false);
    };

    return (
        <div className="pb-32 max-w-5xl mx-auto bg-base-100 rounded-lg shadow-xl mb-4">
            <div className="bg-base-100 p-4 sm:p-6 border-b border-base-300 rounded-t-lg">
                <h1 className="text-xl sm:text-2xl font-bold">New Task</h1>
            </div>

            <div className="pb-32 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
                <div className="lg:col-span-2 order-2 lg:order-1">
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-lg font-semibold mb-3">Title</h2>
                        <input
                            className="w-full p-2 border rounded"
                            placeholder="Task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-lg font-semibold mb-3">Description</h2>
                        <div className='bg-base-200'>
                            <EditorContent editor={editor} />
                        </div>
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                    <div>
                        <h3 className="text-sm font-medium mb-2">Status</h3>
                        <select
                            className="select select-bordered w-full text-sm sm:text-base"
                            value={currentStatus}
                            onChange={(e) => setCurrentStatus(parseInt(e.target.value))}
                        >
                            <option value={1}>To Do</option>
                            <option value={2}>In Progress</option>
                            <option value={3}>Done</option>
                        </select>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium mb-2">Sprint</h3>
                        <select
                            className="select select-bordered w-full text-sm sm:text-base"
                            value={currentStatus}
                            onChange={(e) => setCurrentSprint(parseInt(e.target.value))}
                        >
                            <option value={1}>Current Sprint</option>
                            <option value={2}>Next Sprint</option>
                            <option value={3}>Done</option>
                        </select>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium mb-2">Priority</h3>
                        <select
                            className="select select-bordered w-full text-sm sm:text-base"
                            value={currentPriority}
                            onChange={(e) => setCurrentPriority(parseInt(e.target.value))}
                        >
                            <option value={1}>Low</option>
                            <option value={2}>Medium</option>
                            <option value={3}>High</option>
                        </select>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium mb-2">Assignee</h3>
                        <div className="border rounded-lg">
                            {selectedAssignees.map((item, index) => (
                                <div className="flex items-center gap-2 p-2" key={index}>
                                    <img
                                        src={item.avatar}
                                        alt={item.name}
                                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                                    />
                                    <span className="text-sm sm:text-base">{item.name}</span>
                                </div>
                            ))}
                            <button
                                className="btn btn-ghost btn-sm w-full"
                                onClick={() => setIsSelectingAssignees(!isSelectingAssignees)}
                            >
                                {isSelectingAssignees ? 'Done' : 'Add Assignee'}
                            </button>
                            {isSelectingAssignees && (
                                <div className="p-2 border-t">
                                    {users.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-base-200 rounded"
                                            onClick={() => handleAssigneeChange({
                                                userid: user.id,
                                                avatar: user.imageUrl,
                                                name: `${user.firstName} ${user.lastName}`,
                                                email: user.emailAddresses[0].emailAddress
                                            })}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedAssignees.some(a => a.userid === user.id)}
                                                readOnly
                                            />
                                            <img
                                                src={user.imageUrl}
                                                alt={user.firstName}
                                                className="w-6 h-6 rounded-full"
                                            />
                                            <span>{user.firstName}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium mb-2">Reporter</h3>
                        <div className="border rounded-lg">
                            {selectedOwner && (
                                <div className="flex items-center gap-2 p-2">
                                    <img
                                        src={selectedOwner.avatar}
                                        alt={selectedOwner.name}
                                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                                    />
                                    <span className="text-sm sm:text-base">{selectedOwner.name}</span>
                                </div>
                            )}
                            <button
                                className="btn btn-ghost btn-sm w-full"
                                onClick={() => setIsSelectingOwner(!isSelectingOwner)}
                            >
                                {isSelectingOwner ? 'Done' : 'Set Reporter'}
                            </button>
                            {isSelectingOwner && (
                                <div className="p-2 border-t">
                                    {users.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-base-200 rounded"
                                            onClick={() => handleOwnerChange(user)}
                                        >
                                            <img
                                                src={user.imageUrl}
                                                alt={user.firstName}
                                                className="w-6 h-6 rounded-full"
                                            />
                                            <span>{user.firstName}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button className="btn btn-primary" onClick={createTask}>
                            Create Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewTaskForm;