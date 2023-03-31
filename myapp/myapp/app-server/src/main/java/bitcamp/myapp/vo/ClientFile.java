package bitcamp.myapp.vo;

import lombok.Data;

@Data

public class ClientFile {
  private int no;
  private String filepath;
  private String originalFilename;
  private String mimeType;
  private int memberNo;
}
