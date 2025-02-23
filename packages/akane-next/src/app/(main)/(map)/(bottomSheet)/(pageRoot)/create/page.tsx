"use client";
import { Box, Button, Field, HStack, Input, Text, IconButton, Textarea, Flex, VStack, StackProps } from "@chakra-ui/react";
import { Dispatch, useState } from "react";
import {
  FileUploadRoot,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload"
import { FaPlus } from "react-icons/fa";
import { HiUpload } from "react-icons/hi"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"

function StoryCreateTop({
    handleCreateQuestion,
    nazos
}: {
    handleCreateQuestion: () => void;
    nazos: {
        id: number;
        description: string;
        image: null;
        answer: string;
        hint1: string;
        hint2: string;
        hint3: string;
        area: {
            longitude: number;
            latitude: number;
            radius: number;
        };
    }[];
}) {
    return (
      <Box p={4}>
      <Text textStyle="2xl" mb={4} >謎解き作成</Text>
      <VStack>
          {/* タイトル */}
          <Field.Root required mb={4}>
              <Field.Label>タイトル <Field.RequiredIndicator /></Field.Label>
              <Field.ErrorText>タイトルが入力されていません</Field.ErrorText>
              <Input placeholder="ストーリータイトル" />
          </Field.Root>

          {/* 画像アップロード */}
          <Field.Root required mb={4}>
              <Field.Label>画像 </Field.Label>
              <FileUploadRoot>
                  <FileUploadTrigger asChild>
                      <Button variant="outline" w="full" color="black" fontWeight="bold">
                          <HiUpload /> 画像アップロード
                      </Button>
                  </FileUploadTrigger>
                  <FileUploadList showSize clearable />
              </FileUploadRoot>
              <Field.ErrorText>画像が選択されていません</Field.ErrorText>
          </Field.Root>

          {/* 所要時間 */}
          <Field.Root required mb={4}>
              <Field.Label>所要時間(参考) <Field.RequiredIndicator /></Field.Label>
              <Field.ErrorText>所要時間が入力されていません</Field.ErrorText>
              <Input placeholder="  分" />
          </Field.Root>

          {/* 謎のリスト */}
          <VStack>
              {nazos.map((nazo) => (
                  <Button colorPalette="gray" 
                          variant="outline"
                          color="black"
                          minW="20vh"
                          key={nazo.id}
                          borderWidth="1px"
                          borderRadius="lg"
                          p={4}
                          onClick={() => handleCreateQuestion()}>
                    問い {nazo.id} <RiArrowRightLine />
                  </Button>
              ))}
              <IconButton aria-label="Add" color="black" variant="outline" onClick={() => handleCreateQuestion()}>
                <FaPlus />
              </IconButton>
          </VStack>

          {/* 投稿・下書き・削除 */}
          <VStack>
              <Button colorPalette="green" minW="20vh" mb={3}>投稿</Button>
              <Button colorPalette="green" variant="outline" color="green" minW="20vh" mb={3}>下書き保存</Button>
              <Button colorPalette="red" minW="20vh" mb={3}>削除</Button>
          </VStack>
      </VStack>
  </Box>
    )
}

function QuestionPage({
    setPageState,
}: {
    setPageState: Dispatch<string>;
    questions: unknown[];
    setQuestions: Dispatch<{
        id: number;
        description: string;
        image: null;
        answer: string;
        hint1: string;
        hint2: string;
        hint3: string;
        area: {
            longitude: number;
            latitude: number;
            radius: number;
        };
    }[]>;
}) {
    return (
        <Box p={4}>
            {/* <Button onClick={() => setPageState("/")}>←戻る</Button> */}
            <Button onClick={() => setPageState("/")}>
            <RiArrowLeftLine />戻る
            </Button>
            <Flex gap="4" justify="space-between" mb={6}>
              <Text textStyle="2xl">問題作成</Text>   
              <Button colorPalette="red" minW="20vh">削除</Button>
            </Flex>

            <VStack>
              <Field.Root mb={6}>
                <Field.Label>問題の内容<Field.RequiredIndicator /></Field.Label>
                <Textarea placeholder="内容" />
              </Field.Root>

              <Field.Root required mb={6}>
                <Field.Label>画像 </Field.Label>
                <FileUploadRoot>
                    <FileUploadTrigger asChild>
                        <Button variant="outline" w="full" color="black" fontWeight="bold">
                            <HiUpload /> 画像アップロード
                        </Button>
                    </FileUploadTrigger>
                    <FileUploadList showSize clearable />
                  </FileUploadRoot>
                  <Field.ErrorText>画像が選択されていません</Field.ErrorText>
              </Field.Root>

              {/* <Field.Root>
                  <Field.Label>答え</Field.Label>
                  <Field.HelperText>問題の答えを入力してください</Field.HelperText>
                  <Field.ErrorText>答えが入力されていません</Field.ErrorText>
                  <Field.RequiredIndicator />
                  <Input placeholder="答え" />
              </Field.Root> */}
              <Field.Root required mb={6}>
                <Field.Label>答え <Field.RequiredIndicator /></Field.Label>
                <Field.ErrorText>答えが入力されていません</Field.ErrorText>
                <Input placeholder="答え" />
              </Field.Root>

                {/* <Field.Root>
                    <Field.Label>ヒント1</Field.Label>
                    <Field.HelperText>問題のヒント1を入力してください</Field.HelperText>
                    <Field.ErrorText>ヒント1が入力されていません</Field.ErrorText>
                    <Field.RequiredIndicator />
                    <Input placeholder="ヒント1" />
                </Field.Root> */}
              <Field.Root required mb={6}>
                <Field.Label>ヒント１<Field.RequiredIndicator /></Field.Label>
                <Field.ErrorText>ヒント１が入力されていません</Field.ErrorText>
                <Input placeholder="ヒント１" />
              </Field.Root>

              <Field.Root mb={6}>
                <Field.Label>ヒント２</Field.Label>
                <Input placeholder="ヒント２" />
              </Field.Root>
              <Field.Root mb={6}>
                <Field.Label>ヒント３</Field.Label>
                <Input placeholder="ヒント３" />
              </Field.Root>

              <Field.Root mb={6}>
                  {/* ここはmaplayoutの地図のclickEventとかを取るのでFieldとかはつかわない */}
                  <Field.Label>場所</Field.Label>
                  <Field.HelperText>問題の場所を入力してください</Field.HelperText>
                  <Field.ErrorText>場所が入力されていません</Field.ErrorText>
                  <Field.RequiredIndicator />
                  <Input placeholder="場所" />
              </Field.Root>

            </VStack>
        </Box>
    )
}

export default function NazoCreatePage() {
    const [pageState, setPageState] = useState("/");
    const [questions, setQuestions] = useState([{
        id: 1, // mapの色々対策(削除時のアレ)のため、連番で付与していく
        description: "謎解きの説明",
        image: null,
        answer: "謎解きの答え",
        hint1: "ヒント1",
        hint2: "ヒント2",
        hint3: "ヒント3",
        area: {
            longitude: 135,
            latitude: 34,
            radius: 100, //m
        }
    }]);  // TODO: 型は後でちゃんと書く @/types とかに
    
    if (pageState === "/") {
        return (
            <>
                <StoryCreateTop
                    handleCreateQuestion={() => setPageState("/create/question")}
                    nazos={questions}
                />
            </>
        );
    } else if (pageState === "/create/question") {
        return (
            <>
                <QuestionPage
                    setPageState={setPageState}
                    questions={questions}
                    setQuestions={setQuestions}
                />
            </>
        );
    } else {
        return (
            <Text>404</Text>
        );
    }
}