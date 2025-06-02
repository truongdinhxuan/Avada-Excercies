import { Text, Badge, Button } from "@shopify/polaris"
const GroupActions = ({ title }) => {
    
    const value = [
        
    ]

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text
                fontWeight="bold"
            >
                {title}
            </Text>
            <div className="group-actions">
                
                <Badge
                    tone="attention"
                >
                    <span style={{fontWeight: 'bold'}}>
                        Incomplete
                    </span>
                </Badge>
                
                <Button>Complete</Button>
                
                <Button
                    tone="critical"
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}
export default GroupActions