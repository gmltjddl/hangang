package bitcamp.myapp.service;

import java.util.List;
import bitcamp.myapp.vo.QnaComment;

public interface QnaCommentService {
  void add(QnaComment qnacomment);
  List<QnaComment> list(int qnaNo);
  List<QnaComment> list(String keyword);
  QnaComment get(int qnaNo);
  QnaComment get(String email, String password);
  void update(QnaComment qnacomment);
  void delete(int no);

}
