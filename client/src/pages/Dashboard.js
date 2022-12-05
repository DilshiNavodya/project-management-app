import React, { Fragment, useEffect, useState } from "react";
import apiClient from "../services/ApiClient";
import Chart from "../components/UI/Chart";
import Card from "../components/UI/Card";
function Dashboard() {
  const [statusSeries, setStatusSeries] = useState();
  const [assigneesSeries, setAssigneesSeries] = useState();
  const statusLabels = ["ToDo", "InProgress", "Done"];
  const [count, setCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  let assignees = [];
  useEffect(() => {
    const fetchTasks = async () => {
      let ToDoCount = 0;
      let InPCount = 0;
      let doneCount = 0;
      let series = [];
      let countTasks = 0;
      const { dataresponse, error } = await apiClient.fetchAllTasks();
      dataresponse.result.map((task) => {
        if (task.status === 1) {
          ToDoCount = ToDoCount + 1;
        }
        if (task.status === 2) {
          InPCount = InPCount + 1;
        }
        if (task.status === 3) {
          doneCount = doneCount + 1;
        }
        if (task.dueDate.toString().slice(0, 10) === new Date().toLocaleDateString('en-CA').slice(0, 10)) {
          countTasks = countTasks + 1;
        }
      });
      setCount(ToDoCount + InPCount);
      setTaskCount(countTasks);
      series[0] = ToDoCount;
      series[1] = InPCount;
      series[2] = doneCount;
      setStatusSeries(series);
    };
    fetchTasks();
  }, [count]);
  useEffect(() => {
    const fetchAssignees = async () => {
      let count = {};
      const { dataresponse, error } = await apiClient.fetchAllAssignees();
      dataresponse.result.map((assignee) => {
        if (count[assignee.assigneeid]) {
          count[assignee.assigneeid] += 1;
          return;
        }
        count[assignee.assigneeid] = 1;
      });
      let keys = Object.keys(count);
      let series = [];
      keys.map((key) => {
        series.push(count[key]);
      });
      setAssigneesSeries(series);
      let labels = {};
      dataresponse.result.map((assignee) => {
        keys.map((key) => {
          if (assignee.assigneeid === key) {
            labels[key] = assignee.name;
          }
        });
      });
      keys = Object.keys(labels);
      keys.map((key) => {
        assignees.push(labels[key]);
      });
    };
    fetchAssignees();
  }, []);
  return (
    <Fragment>
      <div className="d-flex justify-content-center align-items-center gap-4 p-4">
        <Card>
          <div className="d-flex flex-column justify-content-center align-items-center p-4 gap-4">
            <h4>Total number of tasks that are in-progress</h4>
            <h5>{count}</h5>
          </div>
        </Card>
        <Card>
          <div className="d-flex flex-column justify-content-center align-items-center p-4 gap-4">
            <h4>Total number of tasks that are due today</h4>
            <h5>{taskCount}</h5>
          </div>
        </Card>
      </div>
      <div className="d-flex justify-content-center gap-4 p-4">
        <Card>
          <h4>Status wise task distribution</h4>
          <Chart series={statusSeries} labels={statusLabels} />
        </Card>
        <Card>
          <h4>Assignee wise task distribution</h4>
          <Chart series={assigneesSeries} labels={assignees} />
        </Card>
      </div>
    </Fragment>
  );
}
export default Dashboard;
