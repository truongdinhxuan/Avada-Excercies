import { Text, Badge, Button } from "@shopify/polaris"
const GroupActions = ({ onDelete, title, isComplete, handleIsComplete }) => {
    // Delete a todo
    const handleDelete = () => {
        onDelete()
    }
    const handleToggleComplete = () => {
        handleIsComplete()
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text
                fontWeight="bold"
            >
                {title}
            </Text>
            <div className="group-actions">
                {isComplete
                ?<Badge
                    tone="success"
                >
                    <span style={{ fontWeight: 'bold' }}>
                        Complete
                    </span>
                </Badge>
                :
                <Badge
                    tone="attention"
                >
                    <span style={{ fontWeight: 'bold' }}>
                        Incomplete
                    </span>
                </Badge>}
                
                <Button
                    onClick={handleToggleComplete}
                >Complete</Button>
                <Button
                    tone="critical"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}
export default GroupActions