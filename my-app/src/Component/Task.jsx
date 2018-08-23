import React, { Component } from 'react';

class Task extends Component {


    // tasks = props.tasks;

    tasks =
        [
            {
                "id":"example1",
                "vacancy": "НПО Антей, frontend разработчик - 3"
            },
            {
                "id":"example2",
                "vacancy": "НПО Антей, backend разработчик - 3"
            },
            {
                "id":"example3",
                "vacancy": "НПО Антей, дизайнер - 3"
            }
        ];

        // { "one": 1, "two": 2, "three": 3 };


    listItems = this.tasks.map((task) =>

        <div>
            <a className="btn btn-primary" role="button" data-toggle="collapse" href={"#"+ task.id} aria-expanded="false" aria-controls={task.id}>
                <i className="far fa-calendar-plus"></i><p className="text">{task.vacancy}</p>
            </a>

            <div className="collapse" id={task.id}>
                <div className="well">
                    <table className="table border">
                        <tr className="d-flex justify-content-around">
                            <td>10.08.2018 17:04</td>
                            <td>HDPR</td>
                            <td>Рассмотреть</td>
                            <td>&nbsp</td>
                        </tr>
                        <tr className="d-flex justify-content-around">
                            <td></td>
                            <td><a href="#" className="candidate"><ins>Иванов Иван Иванович</ins></a></td>
                            <td>&nbsp</td>
                        </tr>
                    </table>
                    <table className="table border">
                        <tr className="d-flex justify-content-around">
                            <td>09.08.2018 15:40</td>
                            <td>HDPR</td>
                            <td>Принять решение</td>
                            <td>&nbsp</td>

                        </tr>
                        <tr className="d-flex justify-content-around">
                            <td>18.08.2018 20:00</td>
                            <td><a href="#" className="candidate"><ins>Петров Петр</ins></a></td>
                            <td>&nbsp</td>

                        </tr>
                    </table>
                    <table className="table border">
                        <tr className="d-flex justify-content-around">
                            <td><del>07.08.2018 20:47</del></td>
                            <td><del>HDPR</del></td>
                            <td><del>Оценить</del></td>
                            <td>Выполнена</td>
                        </tr>
                        <tr className="d-flex justify-content-around">
                            <td><del>10.07.2018 10:08</del></td>
                            <td><a href="#" className="candidate"><del>Сидоров Сергей</del></a></td>
                            <td>12.08.2018 17:30</td>
                        </tr>
                    </table>

                </div>
            </div>

        </div>
        // <li>{task}</li>
    );

    render() {

        return (
            <div>{this.listItems}</div>
        );
    }
}

export default Task;
