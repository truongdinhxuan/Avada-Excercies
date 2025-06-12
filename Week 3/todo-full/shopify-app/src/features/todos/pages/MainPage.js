import { Page, ResourceList, ResourceItem, Card } from "@shopify/polaris"
import { useState, useCallback, useEffect } from "react"
import GroupActions from "../components/GroupActions"
import CreateModal from "../components/CreateModal"
import BulkAction from "../components/BulkActions"
import { getAllTodos, createTodo, deleteTodo, updateTodo } from "../../../api/todo.service"
import { useTodos } from "../hooks/useTodos"
/**
 * @description MainPage component that renders a page with a list of todo items, a modal for creating new items, and bulk actions for selected items.
 * @returns {JSX.Element} - The rendered MainPage component.
 */

function MainPage() {
  const [isActiveModal, setIsActiveModal] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  // const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {
    items,
    create,
    removeTodo,
    removeTodos,
    toggleStatusTodo,
    handleCompleteStatusTodos,
    handleInCompleteStatusTodos
  } = useTodos()
  // Modal toggle
  const handleToggleModal = useCallback(() => {
    setIsActiveModal(prev => !prev)
  }, [])

  // Add new item
  const handleSaveItem = useCallback(async (title) => {
    await create(title)
    setIsLoading(true);
    setIsActiveModal(false);
  }, [create])

  // Handle selection change
  const handleSelectionChange = useCallback((selected) => {
    setSelectedItems(selected)
    // console.log(selected)
  }, [])

  // Delete selected items by ID
  const handleDeleteSelectedItems = useCallback(async (selected) => {
    // bulkDelete
    await removeTodos(selected);
    setSelectedItems([]);
  }, [removeTodos]);

  // Delete items by index - convert index to ID then delete
  const handleDeleteItemsByIndex = useCallback(async (indices) => {
    await removeTodo(indices);
    setSelectedItems([]);
  }, [removeTodo]);

  const BodyPage = (
    <Card>
      <ResourceList
        resourceName={{ singular: 'item', plural: 'items' }}
        items={items}
        selectable
        showHeader={selectedItems.length > 0}
        selectedItems={selectedItems}
        onSelectionChange={handleSelectionChange}
        renderItem={(item) => {
          const { id, title, isCompleted } = item
          return (
            <ResourceItem
              id={id}
              accessibilityLabel={title}
            >
              <GroupActions
                title={title}
                onDelete={() => handleDeleteItemsByIndex(items.findIndex(item => item.id === id))}
                isCompleted={isCompleted}
                handleStatusTodo={() => toggleStatusTodo(id)}
              />
            </ResourceItem>
          )
        }}
      />
      <BulkAction
        open={selectedItems.length >= 1}
        onDelete={() => handleDeleteSelectedItems(selectedItems)}
        onBulkComplete={() => handleCompleteStatusTodos(selectedItems)}
        onBulkIncomplete={() => handleInCompleteStatusTodos(selectedItems)}
      />
    </Card>
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
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
    </Page>
  )
}

export default MainPage