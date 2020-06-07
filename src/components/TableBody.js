import React from "react";
import { Table, Image, Header } from 'semantic-ui-react';


function TableBody({employees}) {
    // console.log(employees);
    return (
        <Table.Body>
            {employees[0] !== undefined && employees[0].name !== undefined ? (
            employees.map( ({ picture, name, email, phone }) => {
                return (
                    <Table.Row>
                        <Table.Cell>
                            <Image src={picture.medium} />
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{name.first} {name.last}</Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{email}</Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{phone}</Header>
                        </Table.Cell>
                    </Table.Row> 
                );
            })) : (<></>) }        
        </Table.Body>
    );
}

export default TableBody;