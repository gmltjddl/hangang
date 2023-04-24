package bitcamp.myapp.service;

import java.util.List;
import bitcamp.myapp.vo.Board;
import bitcamp.myapp.vo.BoardFile;

public interface BoardService {
  void add(Board board);
  List<Board> list(String keyword);
  Board get(int no);
  void update(Board board);
  void delete(int no);
  public List<Board> listByUser(String keyword, int userId);
  BoardFile getFile(int fileNo);
  void deleteFile(int fileNo);
  void deleteLikes(int no);
  void deleteComments(int no);
}





