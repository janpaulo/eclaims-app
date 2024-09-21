import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Paper from "@mui/material/Paper";
import SharedAppBar from "../../shared/SharedAppBar";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// import moment from "moment";

class rvsCodeTable extends React.Component {
  constructor() {
    super();
    this.state = {
      // title: "ICD CODES",
      // item: {},
      // items: [],
      // value: 0,
    };
  }

  // componentDidMount() {
  //   this.handleGetICDcodes();
  // }


  render() {
    const { items, error,item } = this.props;
    // console.log(start);
    return (
      <>
        {/* <button onClick={() => this.props.handleClick(true, true, true)} >sasas</button> */}
        <SharedAppBar
          titleName={this.props.title}
          item={item}
          esoaLink="/"
          isModal={true}
          handleClick={this.props.handleClick}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">RVS CODES</TableCell>
                <TableCell align="center">DESCRIPTION</TableCell>
                <TableCell align="center">Case Rate</TableCell>
                <TableCell align="center">Professional Fee</TableCell>
                <TableCell align="center">
                  Health Care Institution Fee
                </TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {error && <div>Error: {error}</div>}
              {items.length > 0 ? (
                <>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">{item.rvs_code}</TableCell>
                      <TableCell align="">{item.description}</TableCell>
                      <TableCell align="">{item.hci_fee}</TableCell>
                      <TableCell align="center">{item.professional_fee}</TableCell>
                      <TableCell align="center">
                        {item.professional_fee}
                      </TableCell>
                      <TableCell align="center">
                        <div style={{display: "flex"}}>
                        <Tooltip title="Edit" arrow>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() =>
                              this.props.handleClick(
                                item,
                                false,
                                "ICD CODES"
                              )
                            }
                          >
                            <EditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() =>
                              this.props.handleOpenDeletePopup(item, "")
                            }
                          >
                            <DeleteOutlinedIcon />
                          </IconButton>
                        </Tooltip>

                        </div>
                       
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <div>No data available</div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default rvsCodeTable;
