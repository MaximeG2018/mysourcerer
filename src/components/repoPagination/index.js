import React, { Component } from "react";
import { Table } from "evergreen-ui";
import { Tag, Avatar } from "antd";
import moment from "moment";

class ReposPagination extends Component {
  render() {
    return (
      <>
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>Name</Table.TextHeaderCell>
            <Table.TextHeaderCell>Path</Table.TextHeaderCell>

            <Table.TextHeaderCell>Last update</Table.TextHeaderCell>
            <Table.TextHeaderCell>Total Commit</Table.TextHeaderCell>
            <Table.TextHeaderCell>Languages</Table.TextHeaderCell>
            <Table.TextHeaderCell>collaborators</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height={240}>
            {this.props.fetchMoreResult.map((item, index) => (
              <Table.Row key={index} isSelectable>
                <Table.TextCell>{item.name}</Table.TextCell>
                <Table.TextCell>{item.url}</Table.TextCell>

                <Table.TextCell isNumber>
                  {moment(item.updatedAt).format("MMM Do YY")}
                </Table.TextCell>
                <Table.TextCell isNumber>
                  {item.defaultBranchRef
                    ? item.defaultBranchRef.target.history.totalCount
                    : "none"}
                </Table.TextCell>
                <Table.TextCell>
                  {item.languages.nodes.map((language, index) => {
                    return (
                      <Tag key={index} color={language.color}>
                        {language.name}
                      </Tag>
                    );
                  })}
                </Table.TextCell>
                <Table.TextCell>
                  {item.collaborators.nodes.map((collab, index) => {
                    return (
                      <Avatar key={index} src={collab.avatarUrl} size={24} />
                    );
                  })}
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  }
}
export default ReposPagination;
