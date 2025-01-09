import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Checkbox,
  Card,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
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
  completed: boolean;
  content:string;
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
                    mb: 2, // Margin bottom to separate cards

                    minHeight: "35px",
                    padding: "1px 5px", // Padding inside the card
                    borderRadius: 2, // Rounded corners
                    boxShadow: 1, // Add shadow for a card effect
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
                      </Box>
                    }
                  >
                    <Checkbox
                      edge="start"
                      checked={note.completed}
                      sx={{
                        marginTop: -2
                      }}
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
                      secondary={
                        <span
                          style={{
                            textDecoration: note.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {note.content.length > 10 ? note.content.slice(0,10) + "..." : note.content}
                        </span>
                      }
                    />
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
