import { Box, Page, ResourceList, ResourceItem } from "@shopify/polaris"
import { useState, useCallback, useEffect } from "react"
import GroupActions from "./GroupActions"
import CreateModal from "./CreateModal"
import BulkAction from "./BulkActions"
import { getAllTodos } from "../../api/todo.service"
function MainPage() {
    const [isActiveModal, setIsActiveModal] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    // const [isComplete, setIsComplete] = useState(false)
    // Modal
    const handleisActiveModal = useCallback(() => {
        setIsActiveModal(!isActiveModal)
    }, [isActiveModal])
    // Store items function
    const [items, setItems] = useState([
        {
            id: '1',
            title: 'Todo 1',
            isComplete: true
        },
        {
            id: '2',
            title: 'Todo 2',
            isComplete: false
        }
    ])
    // display
    useEffect(() => {
        console.log(getAllTodos())
    },[])
    const handleSaveItem = useCallback((title) => {
        const newId = Math.random().toString()
        const newItem = {
            id: newId,
            title: title,
            isComplete: false
        }
        setItems(prev => [...prev, newItem])
        setIsActiveModal(false)
    }, [])
    // Select items
    const handleSelectionChange = useCallback((selected) => {
        setSelectedItems(selected)
        console.log(selected)
    }, [])
    // Delete item
    const handleDeleteSelectedItems = useCallback(() => {
        setItems(prev => prev.filter(item => !selectedItems.includes(item.id)))
        setSelectedItems([])
    }, [selectedItems])
    const handleDeleteItemsByIndex = useCallback((indices) => {
        if (!Array.isArray(indices)) {
            indices = [indices]
        }
        setItems(prev => {
            const newItems = [...prev]
            const sortedIndices = [...indices].sort((a, b) => b - a)

            sortedIndices.forEach(index => {
                if (index >= 0 && index < newItems.length) {
                    newItems.splice(index, 1)
                }
            })
            return newItems
        })
    }, [])
    // Complete and Incomplete item
    const handleIsComplete = useCallback((itemId) => {
        setItems(prev => prev.map(item =>
            item.id === itemId
                ? { ...item, isComplete: !item.isComplete }
                : item
        ))
    }, [])
    const handleBulkComplete = useCallback(() => {
        setItems(prev => prev.map(item =>
            selectedItems.includes(item.id)
                ? { ...item, isComplete: true }
                : item
        ))
        setSelectedItems([])
    }, [selectedItems])

    const handleBulkIncomplete = useCallback(() => {
        setItems(prev => prev.map(item =>
            selectedItems.includes(item.id)
                ? { ...item, isComplete: false }
                : item
        ))
        setSelectedItems([])
    }, [selectedItems])
    // Main body page
    const BodyPage = (
        <Box>
            <ResourceList
                resourceName={{ singular: 'item', plural: 'items' }}
                items={items}
                selectable
                selectedItems={selectedItems}
                onSelectionChange={handleSelectionChange}
                renderItem={(item) => {
                    const { id, title, isComplete } = item
                    return (
                        <ResourceItem
                            id={id}
                            accessibilityLabel={title}
                        >
                            <GroupActions
                                title={title}
                                onDelete={() => handleDeleteItemsByIndex(items.findIndex(item => item.id === id))}
                                isComplete={isComplete}
                                handleIsComplete={() => handleIsComplete(id)}
                            />
                        </ResourceItem>
                    )
                }}
            />
            <BulkAction
                open={selectedItems.length >= 1}
                onDelete={handleDeleteSelectedItems}
                onBulkComplete={handleBulkComplete}
                onBulkIncomplete={handleBulkIncomplete}
            />
        </Box>
    )

    return (
        <Page
            title="Todoes"
            primaryAction={{
                content: 'Create',
                onAction: handleisActiveModal,
            }}
        >
            {BodyPage}
            <CreateModal
                open={isActiveModal}
                onClose={handleisActiveModal}
                onSave={handleSaveItem}
            />
        </Page>
    )
}

export default MainPage