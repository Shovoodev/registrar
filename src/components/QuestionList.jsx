import { Link } from "react-router-dom";
import { Card, CardGroup } from 'react-bootstrap';

function QuestionList(props) {
    return <CardGroup>
        {props.questions.map((q) => (
            <Card key={q.id}>
                <Card.Body>
                    <Card.Title>{q.text}</Card.Title>
                    <Card.Subtitle>{q.author}</Card.Subtitle>
                </Card.Body>
                <Card.Footer><Link className="text-decoration-none" to={`/answers/${q.id}`}>Give us your answer</Link></Card.Footer>

            </Card>
        ))}
    </CardGroup>
}

export { QuestionList };