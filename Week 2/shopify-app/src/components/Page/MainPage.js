import { Box, Page, ResourceList, ResourceItem } from "@shopify/polaris"
import { useState, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import GroupActions from "./GroupActions"
import CreateModal from "./CreateModal"
import BulkAction from "./BulkActions"
import { ITEMS } from "../../contants"

function MainPage() {
    const [isActiveModal, setIsActiveModal] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    const [items, setItems] = useState(ITEMS)

    // Modal toggle
    const handleToggleModal = useCallback(() => {
        setIsActiveModal(prev => !prev)
    }, [])

    // Add new item
    const handleSaveItem = useCallback((title) => {
        const newItem = {
            id: uuidv4(),
            title,
            isComplete: false
        }
        setItems(prev => [...prev, newItem])
        setIsActiveModal(false)
    }, [])

    // Handle selection change
    const handleSelectionChange = useCallback((selected) => {
        setSelectedItems(selected)
        console.log(selected)
    }, [])

    // Delete selected items by ID
    const handleDeleteSelectedItems = useCallback((selected) => {
        setItems(prev => prev.filter(item => !selected.includes(item.id)))
        setSelectedItems([])
    }, [])

    // Delete items by index
    const handleDeleteItemsByIndex = useCallback((indices) => {
        const indexes = Array.isArray(indices) ? indices : [indices]
        setItems(prev => {
            const newItems = [...prev]
            indexes.sort((a, b) => b - a).forEach(index => {
                if (index >= 0 && index < newItems.length) {
                    newItems.splice(index, 1)
                }
            })
            return newItems
        })
    }, [])

    // Toggle item complete
    const handleIsComplete = useCallback((itemId) => {
        setItems(prev =>
            prev.map(item =>
                item.id === itemId
                    ? { ...item, isComplete: !item.isComplete }
                    : item
            )
        )
    }, [])

    // Mark selected items as complete
    const handleBulkComplete = useCallback((selected) => {
        setItems(prev =>
            prev.map(item =>
                selected.includes(item.id)
                    ? { ...item, isComplete: true }
                    : item
            )
        )
        setSelectedItems([])
    }, [])

    // Mark selected items as incomplete
    const handleBulkIncomplete = useCallback((selected) => {
        setItems(prev =>
            prev.map(item =>
                selected.includes(item.id)
                    ? { ...item, isComplete: false }
                    : item
            )
        )
        setSelectedItems([])
    }, [])

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
                onDelete={() => handleDeleteSelectedItems(selectedItems)}
                onBulkComplete={() => handleBulkComplete(selectedItems)}
                onBulkIncomplete={() => handleBulkIncomplete(selectedItems)}
            />
        </Box>
    )

    return (
        <Page
            title="Todoes"
            primaryAction={{
                content: 'Create',
                onAction: handleToggleModal,
            }}
        >
            {BodyPage}
            <CreateModal
                open={isActiveModal}
                onClose={handleToggleModal}
                onSave={handleSaveItem}
            />
        </Page>
    )
}

export default MainPage