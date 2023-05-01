package bitcamp.myapp.vo;

import java.sql.Timestamp;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class Payment {
  private int payment_id;
  private String imp_uid;
  private String buyer_email;
  private String buyer_name;
  private String paid_amount;
  private String buyer_date;
  private String buyer_time;
  private int adult;
  private int teen;
  private int sumticket;

  @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
  private Timestamp createdDate;
}