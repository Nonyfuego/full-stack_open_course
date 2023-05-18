import './App.css';


const Header = ({course}) => <h1>{course}</h1>

const Part = ({part, exercise}) => <p>{part} {exercise}</p>

const Total = ({parts}) => {
  var total = 0
  parts.forEach(part => {
    total += part.exercise
  });
  return (
    <p>Number of exercises: {total}</p>
  )

}

const Content = ({parts}) => {
  return (
    <div>
      <Part 
      part={parts[0].name}
      exercise={parts[0].exercise}
      />
      <Part 
      part={parts[1].name}
      exercise={parts[1].exercise}
      />
      <Part
      part={parts[2].name}
      exercise={parts[2].exercise}
      />
    </div>
  )
}

const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercise: 10
        },
        {
          name: 'Using props to pass data',
          exercise: 7
        },
        {
          name: 'State of a component',
          exercise: 14
        }
      ]

    }

     return (
    <div className="App">
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  );
}

export default App