package bitcamp.myapp.vo;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class QnaComment {
  private int no;
  private String content;
  private Member writer;
  private int qnaNo;
  private int writerNo;

  @JsonFormat(
      shape = Shape.STRING,
      pattern = "yyyy-MM-dd",
      timezone = "Asia/Seoul")
  private Date createdDate;

}