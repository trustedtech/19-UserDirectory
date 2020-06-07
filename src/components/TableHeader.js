import React from "react";
import { Table } from 'semantic-ui-react';


function TableHeader({ columnHeading, handleSortClick }) {
    return (
        <Table.Header>
            <Table.Row>
            {columnHeading.map(({ title, width }) => {
                return (
                    <Table.HeaderCell
                        key={title}
                        style={{width}}
                        onClick={() => { handleSortClick(title.toLowerCase()); }}>
                    {title}
                    {/* <Icon name='caret up' size='tiny' /> */}
                    </Table.HeaderCell>
                );
            })}
            </Table.Row>
        </Table.Header>

    );
}

export default TableHeader;