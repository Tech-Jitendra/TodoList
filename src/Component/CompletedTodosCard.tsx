import React, { MouseEventHandler } from 'react'
import { Card, Image, Text, Badge, Button, Group, Box } from '@mantine/core';
import { Flex, theme } from 'native-base';

export const CompletedTodosCard = (props: {
    title?: string
    description?: string
    image?: string
}) => {
    return (
        <React.Fragment>
            <Card
                style={{ width: "400px" }}
                shadow="sm"
                p="lg" radius="md"
                withBorder>
                <Card.Section>
                    <Image
                        src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                        height={160}
                        alt="Norway"
                    />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{props.title}</Text>
                    <Badge color="pink" variant="light">
                        On progress
                    </Badge>
                </Group>

                <Text size="sm" color="dimmed">
                    With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                    activities on and around the fjords of Norway
                </Text>
            </Card>
        </React.Fragment >
    )
}
