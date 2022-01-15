import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}

// styled-components를 import하고
// styled components의 테마 정의를 확장하는게 목표
