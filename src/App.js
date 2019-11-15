import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
Auth.configure(awsconfig);
API.configure(awsconfig);

function updateTask(task, newTask) {
  task['task'] = newTask;
  API.graphql((graphqlOperation(mutations.updateTask, {input:task})))
}

function deleteTask(task) {
  API.graphql(graphqlOperation(mutations.deleteTask, {input:{'id':task['id']}}));
}
function App() {

  // const userTask = API.graphql(graphqlOperation(queries.listTasks, {filter:{'name':{'eq':"admin"}}}));
  // console.log(userTask);

  // const rsultVal = API.graphql(graphqlOperation(queries.listTasks)); // Get all stuffs from DB through API.
  // console.log(rsultVal);

  // const oneTask = API.graphql(graphqlOperation(queries.getTask, {id: "id"})).then(function(task) {
  //   // updateTask(task['data']['getTask'], "new desc");
  //   deleteTask(task['data']['getdata']);
  // }); // Get specific stuff from DB through API.
  // console.log(oneTask);

  Auth.currentAuthenticatedUser({
    bypassCache: false
  }).then(function(user) {
    console.log("User: " + JSON.stringify(user));
    const task = {name: user['username'], description: "new task"};
    const newTask = API.graphql(graphqlOperation(mutations.createTask, {input: task}));
  }).catch(err => console.log(err));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuthenticator(App, {includeGreetings: true});
// export default App;
