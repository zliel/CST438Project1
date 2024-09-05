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
}