import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  public make: string;

  @IsString()
  public model: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  public year: number;

  @Min(0)
  @Max(1000000)
  @IsNumber()
  public mileage: number;

  @IsLongitude()
  @IsNumber()
  public lng: number;

  @IsLatitude()
  @IsNumber()
  public lat: number;

  @Min(0)
  @Max(1000000)
  @IsNumber()
  public price: number;
}
