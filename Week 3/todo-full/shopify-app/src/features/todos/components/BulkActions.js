import { Card, Button, InlineStack, Box, BlockStack } from "@shopify/polaris"
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
                        <Box position="sticky" insetBlockEnd={0} insetInlineStart={0} insetInlineEnd={0} paddingBlock={400} zIndex="1000">
                            <BlockStack inlineAlign="center" >
                                <Card >
                                        <InlineStack align="center" gap={400}>
                                            <Button size="medium" onClick={handleBulkComplete}>
                                                Complete
                                            </Button>
                                            <Button size="medium" onClick={handleBulkIncomplete}>
                                                Incomplete
                                            </Button>
                                            <Button size="medium" onClick={handleDelete}>
                                                Delete
                                            </Button>
                                        </InlineStack>
                                </Card>
                            </BlockStack>
                        </Box>
                )
            }
        </>
    )
}

export default BulkAction