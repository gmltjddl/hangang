package bitcamp.myapp.service;

import java.util.List;
import bitcamp.myapp.vo.Like;

public interface LikeService {
  void addLike(Like like);
  List<Like> getLikes(int postId);
  void removeLike(Like like);
}