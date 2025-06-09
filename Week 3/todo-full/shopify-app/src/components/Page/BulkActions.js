import { Card, Button } from "@shopify/polaris"
const BulkAction = ({ open, onDelete, onBulkComplete, onBulkIncomplete }) => {
    const handleDelete = () => {
        onDelete()
    }

    const handleBulkComplete = () => {
        onBulkComplete()
    }

    const handleBulkIncomplete = () => {
        onBulkIncomplete()
    }
    return (
        <>
            {
                open && (
                    <div className="actions-bulk">
                        <Card>
                            <div className="group-actions-bulk">
                                <Button size="medium" onClick={handleBulkComplete}>
                                    Complete
                                </Button>
                                <Button size="medium" onClick={handleBulkIncomplete}>
                                    Incomplete
                                </Button>
                                <Button size="medium" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    </div>
                )
            }
        </>
    )
}

export default BulkAction