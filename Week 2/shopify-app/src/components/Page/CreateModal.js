import { Modal, TextField } from "@shopify/polaris"
import { useState, useCallback } from "react"

/**
 * @description This component renders a modal with a text field for the item title and buttons to save or cancel the action.
 * @param {Object: { open: boolean, onClose: function, onSave: function }} props - The component props.
 * @returns {JSX.Element} - The rendered modal component.
 */
const CreateItemModal = ({ open, onClose, onSave }) => {
    const [valueNewItem, setValueNewItem] = useState("")

    const handleChangeTextField = useCallback(
        (newValue) => setValueNewItem(newValue),
        []
    )

    const handleSave = useCallback(() => {
        onSave(valueNewItem)
        setValueNewItem("")
    }, [valueNewItem, onSave])

    const handleClose = useCallback(() => {
        setValueNewItem("")
        onClose()
    }, [onClose])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            title="Create new Todo"
            primaryAction={{
                content: "Add",
                onAction: handleSave
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: handleClose
                }
            ]}
        >
            <Modal.Section>
                <TextField
                    label="Title"
                    value={valueNewItem}
                    onChange={handleChangeTextField}
                />
            </Modal.Section>
        </Modal>
    )
}

export default CreateItemModal