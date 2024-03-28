package com.olbl.stickeywaiting.service;

public interface WaitingService {

    Long addToWaitQueue(int id, int gameId);

    void moveToRunQueue();

    boolean cancelWaitQueue(int id, int gameId);
}
