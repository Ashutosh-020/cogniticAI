import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'

interface SetupFormProps {
    platform: string
    data: any
    onSubmit: (platform: string, config: any) => void
    onCancel: () => void
    loading: boolean
}

export default function SetupForm({
    platform,
    data,
    onSubmit,
    onCancel,
    loading
}: SetupFormProps) {
    const [selectedId, setSelectedId] = useState('')
    const [selectedName, setSelectedName] = useState('')
    const [createNew, setCreateNew] = useState(false)
    const [newName, setNewName] = useState('')

    const items = platform === 'trello' ? data?.boards :
        platform === 'slack' ? data?.channels :
            data?.projects

    const itemLabel = platform === 'trello' ? 'board' :
        platform === 'slack' ? 'channel' :
            'project'

    const handleSubmit = () => {
        if (createNew) {
            onSubmit(platform, {
                createNew: true,
                [`${itemLabel}Name`]: newName,
                workspaceId: data?.workspaceId
            })
        } else {
            onSubmit(platform, {
                [`${itemLabel}Id`]: selectedId,
                [`${itemLabel}Name`]: selectedName,
                projectKey: selectedId,
                workspaceId: data?.workspaceId
            })
        }
    }

    return (
        <div className="space-y-6">
            <div className='space-y-3'>
                <Label className='block text-sm font-medium text-gray-300'>
                    Target {itemLabel} for action items
                </Label>

                {!createNew ? (
                    <Select
                        value={selectedId}
                        onValueChange={(value) => {
                            const selected = items?.find((item: any) =>
                                item.id === value || item.key === value || item.gid === value
                            )
                            setSelectedId(value)
                            setSelectedName(selected?.name || '')
                        }}
                    >
                        <SelectTrigger className='w-full bg-black/50 border-gray-700 text-gray-200 focus:ring-blue-500/50'>
                            <SelectValue placeholder={`Select an existing ${itemLabel}...`} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0f1115] border-gray-700 text-gray-200">
                            <SelectGroup>
                                <SelectLabel className="text-gray-400">
                                    {itemLabel.charAt(0).toUpperCase() + itemLabel.slice(1)}s
                                </SelectLabel>
                                {items?.map((item: any) => (
                                    <SelectItem
                                        key={item.id || item.key || item.gid}
                                        value={item.id || item.key || item.gid}
                                        className="focus:bg-blue-500/20 focus:text-white cursor-pointer"
                                    >
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                ) : (
                    <Input
                        type='text'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder={`Enter new ${itemLabel} name...`}
                        className='bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500/50'
                    />
                )}
            </div>

            <div className='flex items-center gap-3 p-3 rounded-lg border border-gray-800 bg-white/5'>
                <Checkbox
                    id='create-new'
                    checked={createNew}
                    onCheckedChange={(checked) => setCreateNew(!!checked)}
                    className="border-gray-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor='create-new' className='text-sm text-gray-300 cursor-pointer select-none'>
                    Create a new {itemLabel} instead
                </Label>
            </div>

            <div className='flex gap-3 pt-2'>
                <Button
                    variant="outline"
                    onClick={onCancel}
                    className='flex-1 border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white'
                    type='button'
                >
                    Cancel
                </Button>

                <Button
                    onClick={handleSubmit}
                    disabled={loading || (!createNew && !selectedId) || (createNew && !newName)}
                    className='flex-1 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-600/50 disabled:text-white/50'
                    type='button'
                >
                    {loading ? 'Saving Config...' : 'Save Configuration'}
                </Button>
            </div>
        </div>
    )
}