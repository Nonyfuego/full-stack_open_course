const Content = ({parts}) => {
    return (
        <ul>
            {parts.map(part => 
                <Part name={part.name} exercise={part.exercises} key={part.id} />
            )}
            <Total parts={parts}/>
        </ul>

    )
}

const Total = ({parts}) => {
    let arr = parts.map(part => part.exercises)
    let total = arr.reduce((t,v) => t + v, 0)
    return <p>total of {total} exercises</p>
} 

const Part = ({name, exercise}) => <li>{name} {exercise}</li>

const Header = ({text}) => <h1>{text}</h1>

const Course = ({course}) => {
    return (
        <div className='course'>
            <Header text={course.name}/>
            <Content parts={course.parts}/> 
        </div>
    )
}

export default Course