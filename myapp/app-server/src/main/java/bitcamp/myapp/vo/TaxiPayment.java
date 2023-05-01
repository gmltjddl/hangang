package bitcamp.myapp.vo;

import java.sql.Timestamp;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class TaxiPayment {
  private int payment_id;
  private String imp_uid;
  private String buyer_email;
  private String buyer_name;
  private String paid_amount;
  private String startpoint;
  private String endpoint;


  @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
  private Timestamp createdDate;
}