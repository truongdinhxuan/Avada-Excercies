import { Modal, TextField } from "@shopify/polaris"
import { useState, useCallback } from "react"

const CreateItemModal = ({ open, onClose, onSave }) => {
    const [valueNewItem, setValueNewItem] = useState("Example")

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