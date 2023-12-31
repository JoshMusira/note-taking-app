import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import CreatableReactSelect from 'react-select/creatable'
import { useRef } from 'react'
import { NoteData, Tag } from "../types/Types"
import { useState } from 'react'
type NoteFormProps = {
    onSubmit: (data: NoteData)
}
const NoteForm: React.FC = ({ onsubmit }: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        onsubmit({
            title: titleRef.current!.value,
            markdownRef: markdownRef.current!.value,
            tags: []
        })
    }
    return (
        <Form onsubmit={handleSubmit} >
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required ref={titleRef} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                                value={selectedTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange={tags => {
                                    setSelectedTags(
                                        tags.map(tags => {
                                            return { label: tags.label, id: tags.value }
                                        })
                                    )
                                }}
                                isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as="textarea" rows={15} ref={markdownRef} />
                </Form.Group>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type="submit" variant="primary">Save</Button>
                    <Link to="/">
                        <Button type="button" variant="outline-secondary">Canceal</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}

export default NoteForm