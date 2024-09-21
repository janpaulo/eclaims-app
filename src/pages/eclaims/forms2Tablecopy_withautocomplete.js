import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';

class forms2Table extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  render() {
    const { diagnosCodeData } = this.props;

    console.log(diagnosCodeData);
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2}>Case Rate</TableCell>
                <TableCell rowSpan={2} align="center">
                  ICD 10 CODE
                </TableCell>
                <TableCell rowSpan={2} align="center">
                  RVS CODE
                </TableCell>

                <TableCell colSpan={2} align="center">
                  CASE RATE GROUP
                </TableCell>
                <TableCell colSpan={2} align="center">
                  Amount
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">CODE</TableCell>
                <TableCell align="center">DESCRIPTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1st</TableCell>
                {diagnosCodeData.map((val, i) =>
                  i === 0 ? (
                    <>
                      <TableCell>
                        {" "}
                        <TextField
                          id="outlined-multiline-flexible"
                          // label="Multiline"
                          // multiline
                          // maxRows={4}
                          value={val.selecttedICD === null ?  "":  val.selecttedICD.icd_10_code}
                          disabled
                          fullWidth
                          name="pMemberPIN"
                          size="small"
                          onChange={this.props.onchange}
                        />
                      </TableCell>
                      <TableCell>
                        {" "}
                        <TextField
                          id="outlined-multiline-flexible"
                          // label="Multiline"
                          // multiline
                          // maxRows={4}
                          fullWidth
                          name="pMemberPIN"
                          size="small"
                          onChange={this.props.onchange}
                        />
                      </TableCell>
                      <TableCell>
                        {" "}
                        <TextField
                          id="outlined-multiline-flexible"
                          // label="Multiline"
                          // multiline
                          // maxRows={4}
                          fullWidth
                          name="pMemberPIN"
                          size="small"
                          onChange={this.props.onchange}
                        />
                      </TableCell>
                      <TableCell> 
                      {/* <Textarea
                        maxRows={4}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        defaultValue={val.selecttedICD === null ?  "":  val.selecttedICD.description}
                      /> */}
                       <textarea
                          value={val.selecttedICD === null ?  "":  val.selecttedICD.description}
                          // value={xmlData}
                          // onChange={this.handleXMLInputChange}
                          style={{ width: '100%', height: '100%' }}
                        />
                        
                     </TableCell>
                      <TableCell>
                        {" "}
                        <TextField
                          id="outlined-multiline-flexible"
                          // label="Multiline"
                          // multiline
                          // maxRows={4}
                          disabled
                          value={val.selecttedICD === null ?  "":  val.selecttedICD.case_rate}
                          fullWidth
                          name="pMemberPIN"
                          size="small"
                          onChange={this.props.onchange}
                        />
                      </TableCell>
                    </>
                  ) : (
                    ""
                  )
                )}
              </TableRow>
              <TableRow>
                <TableCell>2nd</TableCell>
                          {console.log(diagnosCodeData.length )}
                {diagnosCodeData.length === 2 ? 
                 <>
                   {diagnosCodeData.map((val, i) =>
                      
                      i === 1 ?
                        (<>
                        <TableCell>
                          {" "}
                          <TextField
                            id="outlined-multiline-flexible"
                            // label="Multiline"
                            // multiline
                            // maxRows={4}
                            disabled
                            fullWidth
                            name="pMemberPIN"
                            value={val.selecttedICD === null ?  "":  val.selecttedICD.icd_10_code}
                            size="small"
                            onChange={this.props.onchange}
                          />
                        </TableCell>
                        <TableCell>
                          {" "}
                          <TextField
                            id="outlined-multiline-flexible"
                            // label="Multiline"
                            // multiline
                            // maxRows={4}
                            fullWidth
                            name="pMemberPIN"
                            size="small"
                            onChange={this.props.onchange}
                          />
                        </TableCell>
                        <TableCell>
                          {" "}
                          <TextField
                            id="outlined-multiline-flexible"
                            // label="Multiline"
                            // multiline
                            // maxRows={4}
                            fullWidth
                            name="pMemberPIN"
                            size="small"
                            onChange={this.props.onchange}
                          />
                        </TableCell>
                        <TableCell>  <textarea
                          value={val.selecttedICD === null ?  "":  val.selecttedICD.description}
                          // value={xmlData}
                          // onChange={this.handleXMLInputChange}
                          style={{ width: '100%', height: '100%' }}
                        />
                        </TableCell>
                        <TableCell>
                          {" "}
                          <TextField
                            id="outlined-multiline-flexible"
                            // label="Multiline"
                            // multiline
                            // maxRows={4}
                            disabled
                            fullWidth
                            name="pMemberPIN"
                            size="small"
                            value={val.selecttedICD === null ?  "":  val.selecttedICD.case_rate}
                            onChange={this.props.onchange}
                          />
                        </TableCell>
                        </>)
                      :

                     ""



                      )}

                </>:
                 <>
                 <TableCell>
                     {" "}
                     <TextField
                       id="outlined-multiline-flexible"
                       // label="Multiline"
                       // multiline
                       // maxRows={4}
                       disabled
                       fullWidth
                       name="pMemberPIN"
                       // value={val.selecttedICD === null ?  "":  val.selecttedICD.icd_10_code}
                       size="small"
                       onChange={this.props.onchange}
                     />
                   </TableCell>
                   <TableCell>
                     {" "}
                     <TextField
                       id="outlined-multiline-flexible"
                       // label="Multiline"
                       // multiline
                       // maxRows={4}
                       fullWidth
                       name="pMemberPIN"
                       size="small"
                       onChange={this.props.onchange}
                     />
                   </TableCell>
                   <TableCell>
                     {" "}
                     <TextField
                       id="outlined-multiline-flexible"
                       // label="Multiline"
                       // multiline
                       // maxRows={4}
                       fullWidth
                       name="pMemberPIN"
                       size="small"
                       onChange={this.props.onchange}
                     />
                   </TableCell>
                   <TableCell> <TextField
                          id="outlined-multiline-flexible"
                          // label="Multiline"
                          // multiline
                          // maxRows={4}
                          fullWidth
                          name="pMemberPIN"
                          size="small"
                          onChange={this.props.onchange}
                        /></TableCell>
                   <TableCell>
                     {" "}
                     <TextField
                       id="outlined-multiline-flexible"
                       // label="Multiline"
                       // multiline
                       // maxRows={4}
                       fullWidth
                       name="pMemberPIN"
                       size="small"
                       // value={val.selecttedICD === null ?  "":  val.selecttedICD.case_rate}
                       onChange={this.props.onchange}
                     />
                   </TableCell>
                 </>


                }
             
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <b>Total Case Rate Amount</b>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  {" "}
                  <TextField
                    id="outlined-multiline-flexible"
                    // label="Multiline"
                    // multiline
                    // maxRows={4}
                    fullWidth
                    name="pMemberPIN"
                    size="small"
                    onChange={this.props.onchange}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default forms2Table;
