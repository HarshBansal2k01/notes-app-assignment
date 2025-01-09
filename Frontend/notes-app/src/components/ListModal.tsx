import React from "react";
import { Box, Grid, Typography, IconButton, Card } from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Demo = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

interface Note {
  _id: string;
  title: string;
}

interface ListModalProps {
  notes: Note[];
  onDelete: (_id: string) => void;
}

const ListModal: React.FC<ListModalProps> = ({ notes, onDelete }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: { xs: "100%", sm: 500, md: 700 },
        mx: "auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            sx={{ mt: 4, mb: 2, textAlign: "center" }}
            variant="h6"
            component="div"
          >
            Notes List
          </Typography>
          <Demo>
            <List>
              {notes.map((note) => (
                <Card
                  key={note._id}
                  sx={{
                    mb: 2,

                    minHeight: "35px",
                    padding: "1px 5px",
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    secondaryAction={
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => onDelete(note._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText primary={<span>{note.title}</span>} />
                  </ListItem>
                </Card>
              ))}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListModal;
