import { Button, Page, ResourceList, ResourceItem, Modal } from "@shopify/polaris"
import { useState, useCallback } from "react"
import GroupActions from "./GroupActions"
function MainPage() {
    // Modal
    const [activeModal, setActiveModal] = useState(false)
    const handleActiveModal = useCallback(() => 
        setActiveModal(!activeModal,[activeModal])
    )
    const CreateItemModal = (
        <Modal
            activator={}
        >
            
        </Modal>
    )
    // Select items
    const [selectedItems, setSelectedItems] = useState([])
    const handleSelectionChange = useCallback((selected) => {
        setSelectedItems(selected);
    }, []);
    // Store items function
    const [items, setItems] = useState([
        {
            id: '1',
            title: 'Todo 1'
        },
        {
            id: '2',
            title: 'Todo 2'
        },
        {
            id: '3',
            title: 'Todo 3'
        }
    ])
    // Main body page
    const BodyPage = (
        <ResourceList
            resourceName={{ singular: 'item', plural: 'items' }}
            items={items}
            selectable
            selectedItems={selectedItems}
            onSelectionChange={handleSelectionChange}
            renderItem={(item) => {
                const { id, title } = item
                return (
                    <ResourceItem
                        id={id}
                        accessibilityLabel={title}
                    >
                        <GroupActions title={title} />
                    </ResourceItem>
                )
            }}
        />
    )
    return (
        <Page
            title="Todoes"
            primaryAction={<Button variant="primary">Create</Button>}
        >
            {BodyPage}
        </Page>
    )
}

export default MainPage