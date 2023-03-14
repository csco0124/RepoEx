package org.hdcd.repository;

import org.hdcd.domain.UserItem;
import org.hdcd.domain.UserItemId;
import org.springframework.data.repository.CrudRepository;

public interface UserItemRepository extends CrudRepository<UserItem, UserItemId> {

}
