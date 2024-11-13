"use client"

import { useState, useEffect } from 'react';
import { ITask, IUser } from "@/types/types";
import { toast } from "react-toastify";
import { ListOfUsers } from '@/services/user';
import { CollaborativeApp } from '@/lib/room/colab';
import { Room } from '@/lib/room/provider';

export default function ViewTask({ data, position }: { data: ITask, position: string }) {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [currentStatus, setCurrentStatus] = useState(data.position);
    const [currentSprint, setCurrentSprint] = useState(data.sprint);
    const [currentPriority, setCurrentPriority] = useState(data.priority);
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedAssignees, setSelectedAssignees] = useState(data.assigned);
    const [selectedOwner, setSelectedOwner] = useState(data.owner);
    const [isSelectingAssignees, setIsSelectingAssignees] = useState(false);
    const [isSelectingOwner, setIsSelectingOwner] = useState(false);
    const [endAt, setEndAt] = useState(data.endAt || null);
    const [isLoading, setIsLoading] = useState(true);

    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : '';

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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    const updateTask = async (updatedData: Partial<ITask>) => {
        try {
            const response = await fetch(`/api/v1/tasks/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    ...updatedData,
                }),
            });

            if (!response.ok) throw new Error('Failed to update task');
            toast.success('Task updated successfully');
        } catch (error) {
            console.log(error)
            toast.error('Failed to update task');
        }
    };

    const handleTitleSubmit = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsEditingTitle(false);
            await updateTask({ title });
        }
    };

    const handleDescriptionSubmit = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            setIsEditingDesc(false);
            await updateTask({ description });
        }
    };

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = parseInt(e.target.value);
        setCurrentStatus(newStatus);

        const updateData: Partial<ITask> = { position: newStatus };

        if (newStatus === 3) {
            const currentTime = new Date().toISOString();
            setEndAt(currentTime);
            updateData.endAt = currentTime;
        } else if (newStatus !== 3 && endAt) {
            setEndAt(null);
            updateData.endAt = null;
        }

        await updateTask(updateData);
    };
    const handleSprint = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSprint = parseInt(e.target.value);
        setCurrentSprint(newSprint);

        const updateData: Partial<ITask> = { sprint: newSprint };

        await updateTask(updateData);
    };

    const handlePriorityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPriority = parseInt(e.target.value);
        setCurrentPriority(newPriority);
        await updateTask({ priority: newPriority });
    };

    const handleAssigneeChange = async (user: IUser) => {
        const isSelected = selectedAssignees.some(a => a.userid === user.id);
        const newAssignees = isSelected
            ? selectedAssignees.filter(a => a.userid !== user.id)
            : [...selectedAssignees, {
                userid: user.id,
                avatar: user.imageUrl,
                name: user.firstName + ' ' + user.lastName,
                email: user.emailAddresses[0].emailAddress
            }];

        setSelectedAssignees(newAssignees);
        await updateTask({ assigned: newAssignees });
    };

    const handleOwnerChange = async (user: IUser) => {
        setSelectedOwner({
            userid: user.id,
            avatar: user.imageUrl,
            name: user.firstName + ' ' + user.lastName,
            email: user.emailAddresses[0].emailAddress
        });
        setIsSelectingOwner(false);
        await updateTask({
            owner: {
                userid: user.id,
                avatar: user.imageUrl,
                name: user.firstName + ' ' + user.lastName,
                email: user.emailAddresses[0].emailAddress
            }
        });
    };

    const copyText = () => {
        navigator.clipboard.writeText(hostname + '/dashboard/board/view/' + data.id);
        toast.success('Successfully copied URL');
    };

    return (
        <div className="pb-32 max-w-5xl mx-auto bg-base-100 rounded-lg shadow-xl mb-4">
            <div className="bg-base-100 p-4 sm:p-6 border-b border-base-300 rounded-t-lg">
                <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
                    <span className="badge badge-primary">TASK-{data.id}</span>
                    <span className="badge badge-outline">{position}</span>
                </div>
                {isEditingTitle ? (
                    <input
                        className="text-xl sm:text-2xl font-bold w-full p-2 border rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleTitleSubmit}
                        onBlur={() => setIsEditingTitle(false)}
                        autoFocus
                    />
                ) : (
                    <h1
                        className="text-xl sm:text-2xl font-bold break-words cursor-pointer hover:bg-base-200 p-2 rounded"
                        onClick={() => setIsEditingTitle(true)}
                    >
                        {title}
                    </h1>
                )}
            </div>

            <div className="pb-32 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
                <div className="lg:col-span-2 order-2 lg:order-1">
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-lg font-semibold mb-3">Description</h2>
                        {isEditingDesc ? (
                            <textarea
                                className="w-full p-2 border rounded"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                onKeyDown={handleDescriptionSubmit}
                                onBlur={() => setIsEditingDesc(false)}
                                rows={5}
                                autoFocus
                            />
                        ) : (
                            <div
                                className="prose max-w-none cursor-pointer hover:bg-base-200 p-2 rounded"
                                onClick={() => setIsEditingDesc(true)}
                            >
                                <p>{description}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="lg:col-span-2 order-2 lg:order-1">
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-lg font-semibold mb-3">Comments</h2>
                        <Room id={`liveblocks:task:${data.id}`}>
                            <CollaborativeApp />
                        </Room>
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                    <div>
                        <h3 className="text-sm font-medium mb-2">Status</h3>
                        <select
                            className="select select-bordered w-full text-sm sm:text-base"
                            value={currentStatus}
                            onChange={handleStatusChange}
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
                            value={currentSprint}
                            onChange={handleSprint}
                        >
                            <option value={1}>Minggu Ini</option>
                            <option value={2}>Minggu Depan</option>
                            <option value={3}>Selesai</option>
                        </select>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium mb-2">Priority</h3>
                        <select
                            className="select select-bordered w-full text-sm sm:text-base"
                            value={currentPriority}
                            onChange={handlePriorityChange}
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
                                            onClick={() => handleAssigneeChange(user)}
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

                    {selectedOwner && (
                        <div>
                            <h3 className="text-sm font-medium mb-2">Reporter</h3>
                            <div className="border rounded-lg">
                                {
                                    selectedOwner && selectedOwner.name
                                        ?
                                        <div className="flex items-center gap-2 p-2">
                                            <img
                                                src={selectedOwner.avatar}
                                                alt={selectedOwner.name}
                                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                                            />
                                            <span className="text-sm sm:text-base">{selectedOwner.name}</span>
                                        </div>
                                        :
                                        null
                                }
                                <button
                                    className="btn btn-ghost btn-sm w-full"
                                    onClick={() => setIsSelectingOwner(!isSelectingOwner)}
                                >
                                    Change Reporter
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
                    )}

                    <div>
                        <h3 className="text-sm font-medium mb-2">Updated Date</h3>
                        <div className='border rounded-lg p-2'>{data.updatedAt}</div>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium mb-2">Created Date</h3>
                        <div className='border rounded-lg p-2'>{data.createdAt}</div>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium mb-2">Finish Date</h3>
                        <div className='border rounded-lg p-2'>{data.endAt ? data.endAt : 'On Going'}</div>
                    </div>

                    {endAt && (
                        <div>
                            <h3 className="text-sm font-medium mb-2">Completed Date</h3>
                            <div>{new Date(endAt).toLocaleString()}</div>
                        </div>
                    )}

                    <div className="hidden lg:flex flex-col gap-2">
                        <button className="btn btn-outline" onClick={copyText}>Share</button>
                    </div>
                </div>
            </div>
        </div >

    );
}
