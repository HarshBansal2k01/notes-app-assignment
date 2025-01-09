import React from "react";
import { Box, Grid, Typography, IconButton, Checkbox } from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

interface Note {
  _id: string;
  title: string;
  completed: boolean;
}

interface ListModalProps {
  notes: Note[];
  onDelete: (_id: string) => void;
  onUpdate: (_id: string) => void;
  onToggleComplete: (_id: string) => void;
}

const ListModal: React.FC<ListModalProps> = ({
  notes,
  onDelete,
  onUpdate,
  onToggleComplete,
}) => {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Notes List
          </Typography>
          <Demo>
            <List>
              {notes.map((note) => (
                <ListItem
                  key={note._id}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        aria-label="update"
                        onClick={() => onUpdate(note._id)}
                      >
                        <UpdateIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onDelete(note._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <Checkbox
                    edge="start"
                    checked={note.completed}
                    onChange={() => onToggleComplete(note._id)}
                  />
                  <ListItemText
                    primary={
                      <span
                        style={{
                          textDecoration: note.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {note.title}
                      </span>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListModal;
