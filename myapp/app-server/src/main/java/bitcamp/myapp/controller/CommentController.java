package bitcamp.myapp.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.myapp.service.CommentService;
import bitcamp.myapp.vo.Comment;
import bitcamp.myapp.vo.Member;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/comments")
public class CommentController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("CommentController 생성됨!");
  }

  @Autowired private CommentService commentService;


  @PostMapping
  public Object insert(
      Comment comment,
      HttpSession session
      ) throws Exception{


    Member loginUser = (Member) session.getAttribute("loginUser");

    Member writer = new Member();
    writer.setNo(loginUser.getNo());
    comment.setWriter(writer);
    commentService.add(comment);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }


  @GetMapping
  public Object list(String keyword) {
    log.debug("CommentController.list() 호출됨!");

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(commentService.list(keyword));
  }

  @GetMapping("{no}")
  public Object view(@PathVariable int no) {
    Comment comment = commentService.get(no);
    if (comment != null) {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setData(comment);
    } else {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.NO_DATA);
    }
  }

  @PutMapping("{no}")
  public Object update(
      @PathVariable int no,
      @RequestBody Comment comment) {

    log.debug(comment);

    // 보안을 위해 URL 번호를 게시글 번호로 설정한다.
    comment.setNo(no);

    commentService.update(comment);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    Comment old = commentService.get(no);
    if (old.getWriter().getNo() != loginUser.getNo()) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("권한이 없습니다.");
    }
    commentService.delete(no);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }
}








