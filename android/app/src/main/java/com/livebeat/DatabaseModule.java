package com.livebeat;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.livebeat.Models.User;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;


public class DatabaseModule extends ReactContextBaseJavaModule {
    private final Gson gson = new Gson();

    public DatabaseModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return "DatabaseModule";
    }

    @ReactMethod
    public void getAllUsers(Promise promise) {
        AppDatabase db = DatabaseClient.getInstance(getReactApplicationContext()).getAppDatabase();
        List<User> users = db.userDao().getAll();
        promise.resolve(gson.toJson(users));
    }

    @ReactMethod
    public void getUserByUsername(String username, Promise promise) {
        AppDatabase db = DatabaseClient.getInstance(getReactApplicationContext()).getAppDatabase();
        User user = db.userDao().findByUsername(username);
        promise.resolve(gson.toJson(user));
    }

    @ReactMethod
    public void getUserById(int id, Promise promise) {
        AppDatabase db = DatabaseClient.getInstance(getReactApplicationContext()).getAppDatabase();
        User user = db.userDao().findById(id);
        promise.resolve(gson.toJson(user));
    }

    @ReactMethod
    public void insertUser(String username, String password, ArrayList<String> likedEvents, Promise promise) {
        AppDatabase db = DatabaseClient.getInstance(getReactApplicationContext()).getAppDatabase();
        User user = new User(username, password, likedEvents);
        db.userDao().insert(user);
        promise.resolve(gson.toJson(user));
    }
}