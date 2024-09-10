package com.livebeat.Models;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverters;

import com.livebeat.Converters;

import java.io.Serializable;
import java.util.ArrayList;

@Entity
@TypeConverters({Converters.class})
public class User implements Serializable {
    @PrimaryKey(autoGenerate = true) int id;
    @ColumnInfo(name="username") String username;
    @ColumnInfo(name="password") String password;
    @ColumnInfo(name="liked_events")
    ArrayList<String> likedEvents;

    public User(String username, String password, ArrayList<String> likedEvents) {
        this.username = username;
        this.password = password;
        this.likedEvents = likedEvents;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ArrayList<String> getLikedEvents() {
        return likedEvents;
    }

    public void setLikedEvents(ArrayList<String> likedEvents) {
        this.likedEvents = likedEvents;
    }
}